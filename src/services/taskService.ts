import prisma from '@/infrastructure/prisma/client'

/**
 * Fetch tasks for a specific user.
 * @param userId - The ID of the user to fetch tasks for.
 * @returns A list of tasks associated with the user's team.
 */
export const getTasks = async (userId: string) => {
  return prisma.task.findMany({
    where: {
      team: {
        members: {
          some: {
            id: userId
          }
        }
      }
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true
    }
  })
}

/**
 * Create a new task.
 * @param taskData - The data for the new task.
 * @returns The created task.
 */
export const createTask = async ({
  title,
  description,
  status,
  teamId
}: {
  title: string
  description?: string
  status?: string
  teamId: string
}) => {
  if (!title) throw new Error('Title is required')
  return prisma.task.create({
    data: {
      title,
      description,
      status: status || 'BACKLOG', // Default status is BACKLOG
      teamId
    }
  })
}

/**
 * Update an existing task.
 * @param id - The ID of the task to update.
 * @param userId - The ID of the user making the update.
 * @param updates - The updates to apply to the task.
 * @returns The updated task.
 */
export const updateTask = async (
  id: string,
  userId: string,
  updates: Partial<{
    title: string
    description: string
    status: string
  }>
) => {
  return prisma.task.update({
    where: {
      id,
      team: {
        members: {
          some: {
            id: userId
          }
        }
      }
    },
    data: updates
  })
}

/**
 * Delete a task.
 * @param id - The ID of the task to delete.
 * @param userId - The ID of the user requesting the deletion.
 * @returns The deleted task.
 */
export const deleteTask = async (id: string, userId: string) => {
  return prisma.task.delete({
    where: {
      id,
      team: {
        members: {
          some: {
            id: userId
          }
        }
      }
    }
  })
}
