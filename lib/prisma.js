// This file ensures we only create one Prisma Client across the application
// and properly handle hot-reloading in development

import { PrismaClient } from '@prisma/client';

// Add prisma to the NodeJS global type
// This prevents multiple instances of Prisma Client in development
const globalForPrisma = global;

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Create a new Prisma Client instance if one doesn't exist on the global object
const prisma = globalForPrisma.prisma || new PrismaClient({
  log: isDevelopment ? ['query', 'error', 'warn'] : ['error'],
});

// In development, attach the Prisma Client to the global object
// This prevents creating a new connection on every hot reload
if (isDevelopment) {
  globalForPrisma.prisma = prisma;
}
// Handle application shutdown to properly disconnect Prisma Client
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
