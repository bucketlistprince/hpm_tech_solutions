const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');
  
  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.file.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});
  
  // Hash a password for the test user
  const hashedPassword = await bcrypt.hash('testpassword', 10);
  
  // Create a test user
  const testUser = await prisma.user.create({
    data: {
      id: 'testuser123',
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'CLIENT',
    },
  });
  
  console.log('Test user created:', testUser);
  
  // Create a test project
  const testProject = await prisma.project.create({
    data: {
      id: 'testproject123',
      title: 'Test Project',
      description: 'This is a test project',
      status: 'IN_PROGRESS',
      clientId: testUser.id,
      type: 'WEBSITE',
      clientName: testUser.name,
      clientEmail: testUser.email,
      clientPhone: '123-456-7890',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  
  console.log('Test project created:', testProject);
  
  // Create a test invoice
  const testInvoice = await prisma.invoice.create({
    data: {
      id: 'testinvoice123',
      projectId: testProject.id,
      userId: testUser.id,
      amount: 1000.00,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      status: 'PENDING',
      createdAt: new Date(),
    },
  });
  
  console.log('Test invoice created:', testInvoice);
  
  // Create test files
  const testFiles = [
    {
      id: 'file1',
      name: 'Project Brief.pdf',
      type: 'application/pdf',
      url: 'https://example.com/files/project-brief.pdf',
    },
    {
      id: 'file2',
      name: 'Wireframes.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      url: 'https://example.com/files/wireframes.docx',
    },
    {
      id: 'file3',
      name: 'Budget.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      url: 'https://example.com/files/budget.xlsx',
    },
  ];
  
  for (const file of testFiles) {
    const testFile = await prisma.file.create({
      data: {
        ...file,
        projectId: testProject.id,
      },
    });
    console.log('Test file created:', testFile);
  }
  
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
