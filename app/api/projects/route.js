import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to handle errors
function handleError(error, message = 'An error occurred') {
  console.error(message, error);
  return new Response(
    JSON.stringify({ 
      error: process.env.NODE_ENV === 'development' ? error.message : message 
    }), 
    { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    }
  );
}

export async function GET() {
  try {
    console.log('GET /api/projects - Starting request');
    
    // Get the current user session
    const session = await getServerSession(authOptions);
    console.log('Session:', session?.user?.email ? 'Authenticated' : 'Not authenticated');

    // Check if user is authenticated
    if (!session?.user?.id) {
      console.log('Authentication failed - No session or user ID');
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    try {
      console.log(`Fetching projects for user: ${session.user.id}`);
      
      // Fetch projects for the current user with proper error handling
      const projects = await prisma.project.findMany({
        where: {
          clientId: session.user.id, // Using clientId to match schema
        },
        include: {
          // Only include the User relation with the fields we need
          User: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      console.log(`Found ${projects.length} projects`);

      // Format the response to match frontend expectations
      const formattedProjects = projects.map(project => {
        const formatted = {
          id: project.id,
          title: project.title || 'Untitled Project',
          description: project.description || 'No description available',
          type: project.type || 'UNKNOWN',
          status: project.status || 'DRAFT',
          company: project.companyName || 'N/A',
          industry: 'N/A', // Not in the schema, but frontend expects it
          contactPerson: {
            // Using project.User for user data since we included it in the query
            name: project.clientName || project.User?.name || 'N/A',
            email: project.User?.email || session.user?.email || 'N/A',
            phone: project.clientPhone || 'N/A',
          },
          budget: project.budget || 0,
          timeline: project.timeline || 'Not specified',
          createdAt: project.createdAt?.toISOString() || new Date().toISOString(),
          updatedAt: project.updatedAt?.toISOString() || new Date().toISOString(),
          details: {
            preferredFeatures: project.preferredFeatures,
            platform: project.platform,
            technologyStack: project.technologyStack,
            mobilePlatform: project.mobilePlatform,
            mobileFeatures: project.mobileFeatures,
            websiteType: project.websiteType,
            responsiveDesign: project.responsiveDesign,
            cmsRequired: project.cmsRequired,
            companyMotto: project.companyMotto,
            specialFeatures: project.specialFeatures,
          },
        };
        
        return formatted;
      });

      console.log('Returning projects:', formattedProjects.length);
      return new Response(
        JSON.stringify(formattedProjects),
        { 
          status: 200, 
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, max-age=0'
          } 
        }
      );
      
    } catch (dbError) {
      console.error('Database error:', dbError);
      return handleError(dbError, 'Failed to fetch projects from database');
    }

  } catch (error) {
    console.error('Unexpected error in /api/projects:', error);
    return handleError(error, 'An unexpected error occurred');
  } finally {
    await prisma.$disconnect().catch(e => {
      console.error('Error disconnecting Prisma client:', e);
    });
  }
}

export async function POST(request) {
  try {
    console.log('POST /api/projects - Starting request');
    
    // Get the current user session
    const session = await getServerSession(authOptions);
    console.log('Session:', session?.user?.email ? 'Authenticated' : 'Not authenticated');

    // Check if user is authenticated
    if (!session?.user?.id) {
      console.log('Authentication failed - No session or user ID');
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    try {
      // First, verify the user exists in the database
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        console.log('User not found in database:', session.user.id);
        return new Response(
          JSON.stringify({ error: 'User not found' }), 
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Parse the request body
      const requestData = await request.json();
      console.log('Request data:', JSON.stringify(requestData, null, 2));

      // Extract and validate required fields
      const {
        title,
        description,
        type,
        companyName,
        clientName,
        clientEmail,
        clientPhone,
        // Optional fields with defaults
        budget = 0,
        timeline = 'FLEXIBLE',
        // Website specific
        websiteType = null,
        responsiveDesign = true,
        cmsRequired = false,
        // Mobile app specific
        mobilePlatform = null,
        mobileFeatures = [],
        // Software specific
        softwareType = null,
        integrationRequirements = '',
        databaseRequirements = '',
        // Company info
        companyMotto = '',
        companyHistory = '',
        domainName = '',
        // Contact info
        businessPhone = '',
        address = '',
        // Additional info
        specialFeatures = '',
        contentReady = false,
        websiteManagement = false,
      } = requestData;

      // Basic validation
      if (!title || !description || !type || !companyName || !clientName || !clientEmail || !clientPhone) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }), 
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Create the project in the database
      const project = await prisma.project.create({
        data: {
          title,
          description,
          type,
          status: 'PENDING',
          budget: parseFloat(budget) || 0,
          timeline,
          clientId: session.user.id,
          // Contact and company info
          companyName,
          clientName,
          clientEmail,
          clientPhone,
          businessPhone,
          address,
          // Project details
          websiteType,
          responsiveDesign,
          cmsRequired,
          mobilePlatform,
          mobileFeatures: Array.isArray(mobileFeatures) ? mobileFeatures.join(',') : '',
          softwareType,
          integrationRequirements,
          databaseRequirements,
          companyMotto,
          companyHistory,
          domainName,
          specialFeatures,
          contentReady,
          websiteManagement,
          // Set timestamps
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log('Project created successfully:', project.id);
      
      // Return the created project
      return new Response(
        JSON.stringify({ 
          success: true, 
          projectId: project.id,
          message: 'Project created successfully' 
        }),
        { 
          status: 201, 
          headers: { 
            'Content-Type': 'application/json',
          } 
        }
      );
      
    } catch (dbError) {
      console.error('Database error:', dbError);
      return handleError(dbError, 'Failed to create project in database');
    }

  } catch (error) {
    console.error('Unexpected error in POST /api/projects:', error);
    return handleError(error, 'An unexpected error occurred while processing your request');
  } finally {
    await prisma.$disconnect().catch(e => {
      console.error('Error disconnecting Prisma client:', e);
    });
  }
}
