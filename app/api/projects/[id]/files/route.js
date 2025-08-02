import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

// Import auth options with dynamic import to avoid circular dependencies
const getAuthOptions = async () => {
  const { authOptions } = await import('../../../../../lib/auth.js');
  return authOptions;
};

// Helper function to create consistent error responses
const createErrorResponse = (message, status = 500, details = {}) => {
  return NextResponse.json(
    {
      error: message,
      ...(process.env.NODE_ENV === 'development' && { details })
    },
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    }
  );
};

export async function GET(request, { params }) {
  try {
    // Await the params object before destructuring
    const { id: projectId } = await params;
    console.log('GET /api/projects/[id]/files - Project ID:', projectId);
    
    const authOptions = await getAuthOptions();
    const session = await getServerSession(authOptions);
    
    console.log('Session data:', {
      hasSession: !!session,
      userId: session?.user?.id,
      userRole: session?.user?.role,
      sessionKeys: session ? Object.keys(session) : [],
      userKeys: session?.user ? Object.keys(session.user) : []
    });

    if (!session?.user) {
      console.error('No session found - returning 401');
      return createErrorResponse('Unauthorized - No session found', 401);
    }
    
    console.log('Authenticated user:', {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role
    });

    if (!projectId) {
      return createErrorResponse('Project ID is required', 400);
    }

    // Verify the project exists and check access
    let project;
    try {
      console.log('Looking up project with ID:', projectId);
      project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { 
          id: true,
          clientId: true,
          title: true
        }
      });
      
      console.log('Project lookup result:', JSON.stringify(project, null, 2));
      
      if (!project) {
        console.error('Project not found:', projectId);
        return createErrorResponse('Project not found', 404);
      }

      console.log('Checking project access:', {
        projectClientId: project.clientId,
        sessionUserId: session.user.id,
        sessionUserRole: session.user.role,
        isAdmin: session.user.role === 'ADMIN',
        isProjectOwner: project.clientId === session.user.id
      });

      // Allow access for admin or project owner
      const isAdmin = session.user.role === 'ADMIN';
      const isProjectOwner = project.clientId === session.user.id;
      
      if (!isAdmin && !isProjectOwner) {
        console.error('Access denied - insufficient permissions:', {
          projectClientId: project.clientId,
          sessionUserId: session.user.id,
          sessionUserRole: session.user.role
        });
        return createErrorResponse('Access denied', 403, {
          reason: 'Insufficient permissions',
          requiredRole: 'ADMIN or project owner',
          userRole: session.user.role,
          isProjectOwner
        });
      }
    } catch (dbError) {
      console.error('Database error when looking up project:', {
        error: dbError,
        message: dbError.message,
        projectId
      });
      return createErrorResponse('Database error', 500, dbError.message);
    }

    // Get all files for the project
    try {
      console.log('Fetching files for project:', projectId);
      const files = await prisma.file.findMany({
        where: { 
          projectId: projectId 
        },
        orderBy: { 
          createdAt: 'desc' 
        },
      });
      
      console.log('Files found:', files.length);
      return NextResponse.json(files);
      
    } catch (fileError) {
      console.error('Error fetching files:', {
        error: fileError,
        message: fileError.message,
        projectId
      });
      return createErrorResponse('Failed to fetch files', 500, fileError.message);
    }
    
  } catch (error) {
    console.error('Error in GET /api/projects/[id]/files:', error);
    return createErrorResponse(
      'Failed to fetch files', 
      500, 
      process.env.NODE_ENV === 'development' ? error.message : undefined
    );
  }
}

export async function POST(request, { params }) {
  try {
    // Await the params object before destructuring
    const { id: projectId } = await params;
    const authOptions = await getAuthOptions();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return createErrorResponse('Unauthorized - No session found', 401);
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return createErrorResponse('No file provided', 400);
    }

    // Generate a unique file name
    const fileExtension = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
    
    // In a real app, you would upload the file to a storage service here
    // For now, we'll just save the file metadata
    const fileData = {
      id: `file_${Date.now()}`,
      name: file.name,
      type: file.type,
      size: file.size,
      url: `/uploads/${fileName}`,
      projectId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save file metadata to database
    const savedFile = await prisma.file.create({
      data: {
        id: fileData.id,
        name: fileData.name,
        type: fileData.type,
        size: fileData.size,
        url: fileData.url,
        projectId: fileData.projectId,
      }
    });

    return NextResponse.json(savedFile, { status: 201 });

  } catch (error) {
    console.error('Error in POST /api/projects/[id]/files:', error);
    return createErrorResponse(
      'Failed to upload file', 
      500, 
      process.env.NODE_ENV === 'development' ? error.message : undefined
    );
  }
}
