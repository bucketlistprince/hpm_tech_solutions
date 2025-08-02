'use server';

import prisma from '../prisma';

export async function getProjectById(id) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        invoices: true,
      },
    });

    if (!project) return null;

    // Convert Date objects to ISO strings for serialization
    return {
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      startDate: project.startDate?.toISOString() || null,
      endDate: project.endDate?.toISOString() || null,
      deadline: project.deadline?.toISOString() || null,
      invoices: project.invoices.map(invoice => ({
        ...invoice,
        createdAt: invoice.createdAt.toISOString(),
        dueDate: invoice.dueDate.toISOString(),
      })),
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}
