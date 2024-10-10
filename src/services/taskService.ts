import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (userId: string) => {
  return prisma.task.findMany({
    where: {
      team: {
        members: {
          some: {
            id: userId,
          },
        },
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
    },
  });
};

export const createTask = async ({
  title,
  description,
  status,
  teamId,
}: {
  title: string;
  description?: string;
  status?: string;
  teamId: string;
}) => {
  return prisma.task.create({
    data: {
      title,
      description,
      status: status || "BACKLOG",
      teamId,
    },
  });
};

export const updateTask = async (
  id: string,
  userId: string,
  updates: Partial<{
    title: string;
    description: string;
    status: string;
  }>
) => {
  return prisma.task.update({
    where: {
      id,
      team: {
        members: {
          some: {
            id: userId,
          },
        },
      },
    },
    data: updates,
  });
};

export const deleteTask = async (id: string, userId: string) => {
  return prisma.task.delete({
    where: {
      id,
      team: {
        members: {
          some: {
            id: userId,
          },
        },
      },
    },
  });
};
