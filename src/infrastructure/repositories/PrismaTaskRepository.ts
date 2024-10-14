import { ITaskRepository } from '../../domain/repositories/ITaskRepository'
import { Task, TaskStatus } from '../../domain/entities/Task'
import prisma from '../prisma/client';

/**
 * Repository implementation for tasks using Prisma as the ORM.
 */
export class PrismaTaskRepository implements ITaskRepository {
  /**
   * Finds a task by its ID, ensuring it belongs to the user's team.
   */
  async findById(id: string, userId: string): Promise<Task | null> {
    // Find the task where the team includes the user
    const taskData = await prisma.task.findFirst({
      where: {
        id,
        team: {
          members: {
            some: { id: userId },
          },
        },
      },
    })

    if (!taskData) return null

    // Return a Task entity
    return new Task(
      taskData.id,
      taskData.title,
      taskData.description,
      taskData.status as TaskStatus,
      taskData.teamId!
    )
  }

  // Implement other methods similarly

  /**
   * Finds all tasks associated with the user's team.
   */
  async findAllByUser(userId: string): Promise<Task[]> {
    // Find tasks where the team includes the user
    const tasksData = await prisma.task.findMany({
      where: {
        team: {
          members: {
            some: { id: userId },
          },
        },
      },
    })

    // Map the data to Task entities
    return tasksData.map(
      (taskData) =>
        new Task(
          taskData.id,
          taskData.title,
          taskData.description,
          taskData.status as TaskStatus,
          taskData.teamId!
        )
    )
  }

  /**
   * Creates a new task in the database.
   */
  async create(task: Task): Promise<Task> {
    const taskData = await prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        teamId: task.teamId,
      },
    })

    // Return the created Task entity
    return new Task(
      taskData.id,
      taskData.title,
      taskData.description,
      taskData.status as TaskStatus,
      taskData.teamId!
    )
  }

  /**
   * Updates an existing task in the database.
   */
  async update(task: Task): Promise<Task> {
    const taskData = await prisma.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
      },
    })

    // Return the updated Task entity
    return new Task(
      taskData.id,
      taskData.title,
      taskData.description,
      taskData.status as TaskStatus,
      taskData.teamId!
    )
  }

  /**
   * Deletes a task from the database.
   */
  async delete(id: string, userId: string): Promise<void> {
    await prisma.task.deleteMany({
      where: {
        id,
        team: {
          members: {
            some: { id: userId },
          },
        },
      },
    })
  }
}