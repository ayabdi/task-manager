import {
  updateTask,
  deleteTask
} from "@/services/taskService";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extracting the id from the URL
    const updates = await req.json();
  
    console.log(updates)
    if (!id) {
      return Response.json({ error: "Task Id is required" }, { status: 400 });
    }
  
    try {
      const updatedTask = await updateTask(id, session!.userId, updates);
      return Response.json(updatedTask);
    } catch (error) {
      return Response.json(error);
    }
  }

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Extracting the id from the URL

  if (!id) {
    return Response.json({ error: "Task Id is required" }, { status: 400 });
  }

  try {
    await deleteTask(id, session!.userId);
    return Response.json({ message: "Task deleted successfully" });
  } catch (error) {
    return Response.json(error);
  }
}
