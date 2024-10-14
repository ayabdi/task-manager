
import { TaskController } from "../../../../interfaces/controllers/TaskController"

/**
 * Handles PUT requests to update an existing task.
 * @param req The incoming HTTP request.
 * @returns A Response object with the updated task or an error message.
 */
 
export async function PUT(req: Request) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop() // Extracting the id from the URL

  return TaskController.updateTask(req, id!)
}

/**
 * Handles DELETE requests to delete an existing task.
 * @param req The incoming HTTP request.
 * @returns A Response object with status 204 on success or an error message.
 */
export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop() // Extracting the id from the URL
  return TaskController.deleteTask(req, id!)
}
