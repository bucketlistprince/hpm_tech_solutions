const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Checking project with ID: testproject123');
    const project = await prisma.project.findUnique({
      where: { id: 'testproject123' },
      select: { id: true, clientId: true, title: true, clientName: true, clientEmail: true }
    });
    
    console.log('Project details:', JSON.stringify(project, null, 2));
    
    if (project) {
      const user = await prisma.user.findUnique({
        where: { id: project.clientId },
        select: { id: true, email: true, name: true, role: true }
      });
      
      console.log('Project owner details:', JSON.stringify(user, null, 2));
    }
    
  } catch (error) {
    console.error('Error checking project:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
