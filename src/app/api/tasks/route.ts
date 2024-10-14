import { TaskController } from "@/interfaces/controllers/TaskController"

/**
 * Handles GET requests to retrieve tasks.
 * @param req The incoming HTTP request.
 * @returns A Response object with the list of tasks or an error message.
 */
export async function GET(req: Request) {
  return TaskController.getTasks(req)
}

/**
 * Handles POST requests to create a new task.
 * @param req The incoming HTTP request.
 * @returns A Response object with the created task or an error message.
 */
export async function POST(req: Request) {
  return TaskController.createTask(req)
}