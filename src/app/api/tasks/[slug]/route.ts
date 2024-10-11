import {
  updateTask,
  deleteTask
} from "@/services/taskService";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// Handle PUT requests to update a task
export async function PUT(req: Request) {
    const session = await getServerSession(authOptions); // Get the current session
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extracting the task ID from the URL
    const updates = await req.json(); // Parse the request body for updates

    // Validate task ID
    if (!id) {
      return Response.json({ error: "Task Id is required" }, { status: 400 });
    }

    try {
      const updatedTask = await updateTask(id, session!.userId, updates); // Update the task
      return Response.json(updatedTask); // Return the updated task
    } catch (error) {
      return Response.json(error); // Handle errors
    }
}

// Handle DELETE requests to remove a task
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions); // Get the current session
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Extracting the task ID from the URL

  // Validate task ID
  if (!id) {
    return Response.json({ error: "Task Id is required" }, { status: 400 });
  }

  try {
    await deleteTask(id, session!.userId); // Delete the task
    return Response.json({ message: "Task deleted successfully" }); // Confirm deletion
  } catch (error) {
    return Response.json(error); // Handle errors
  }
}
