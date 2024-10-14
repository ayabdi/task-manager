import { PrismaTaskRepository } from '../../infrastructure/repositories/PrismaTaskRepository'
import { CreateTaskUseCase } from '../../application/useCases/task/CreateTaskUseCase'
import { GetTasksUseCase } from '../../application/useCases/task/GetTasksUseCase'
import { UpdateTaskUseCase } from '../../application/useCases/task/UpdateTaskUseCase'
import { DeleteTaskUseCase } from '../../application/useCases/task/DeleteTaskUseCase'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions'
import { TaskStatus } from '../../domain/entities/Task'
import { fetchUserRecord } from '@/services/userService'

export class TaskController {
  /**
   * Handles the creation of a new task.
   * @param req The incoming HTTP request.
   * @returns A Response object with the created task or an error message.
   */
  static async createTask(req: Request): Promise<Response> {
    try {
      // Get the current user session
      const user = await fetchUserRecord()

      // Check if the user is authenticated
      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
      }

      // Extract the task data from the request body
      const { title, description, status } = await req.json()
      const teamId = user.teamId

      // Validate required fields
      if (!title || !teamId) {
        return new Response(
          JSON.stringify({ error: 'Title and Team ID are required' }),
          { status: 400 }
        )
      }

      // Create instances of the repository and use case
      const taskRepository = new PrismaTaskRepository()
      const createTaskUseCase = new CreateTaskUseCase(taskRepository)

      // Execute the use case to create a new task
      const task = await createTaskUseCase.execute({
        title,
        description,
        status: status as TaskStatus,
        teamId,
      })

      // Return the created task with a 201 status code
      return new Response(JSON.stringify(task), { status: 201 })
    } catch (error: any) {
      // Handle any errors and return a 500 status code
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
  }

  /**
   * Retrieves all tasks associated with the authenticated user.
   * @param req The incoming HTTP request.
   * @returns A Response object with the list of tasks or an error message.
   */
  static async getTasks(): Promise<Response> {
    try {
      // Get the current user session
      const session = await getServerSession(authOptions)

      // Check if the user is authenticated
      if (!session?.userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
      }

      // Create instances of the repository and use case
      const taskRepository = new PrismaTaskRepository()
      const getTasksUseCase = new GetTasksUseCase(taskRepository)

      // Execute the use case to retrieve tasks for the user
      const tasks = await getTasksUseCase.execute(session.userId)

      // Return the list of tasks with a 200 status code
      return new Response(JSON.stringify(tasks), { status: 200 })
    } catch (error: any) {
      // Handle any errors and return a 500 status code
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
  }

  /**
   * Updates an existing task.
   * @param req The incoming HTTP request.
   * @param id The ID of the task to update.
   * @returns A Response object with the updated task or an error message.
   */
  static async updateTask(req: Request, id: string): Promise<Response> {
    try {
      // Get the current user session
      const session = await getServerSession(authOptions)

      // Check if the user is authenticated
      if (!session?.userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
      }

      // Extract the updated fields from the request body
      const { title, description, status } = await req.json()

      // Create instances of the repository and use case
      const taskRepository = new PrismaTaskRepository()
      const updateTaskUseCase = new UpdateTaskUseCase(taskRepository)

      // Execute the use case to update the task
      const task = await updateTaskUseCase.execute({
        id,
        userId: session.userId,
        title,
        description,
        status: status as TaskStatus,
      })

      // Return the updated task with a 200 status code
      return new Response(JSON.stringify(task), { status: 200 })
    } catch (error: any) {
      // Handle any errors and return a 500 status code
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
  }

  /**
   * Deletes an existing task.
   * @param req The incoming HTTP request.
   * @param id The ID of the task to delete.
   * @returns A Response object with status 204 on success or an error message.
   */
  static async deleteTask(_: Request, id: string): Promise<Response> {
    try {
      // Get the current user session
      const session = await getServerSession(authOptions)

      // Check if the user is authenticated
      if (!session?.userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
      }

      // Create instances of the repository and use case
      const taskRepository = new PrismaTaskRepository()
      const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository)

      // Execute the use case to delete the task
      await deleteTaskUseCase.execute({ id, userId: session.userId })

      // Return a 204 No Content response on success
      return new Response(null, { status: 204 })
    } catch (error: any) {
      // Handle any errors and return a 500 status code
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
  }
}