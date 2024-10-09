import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "@/services/taskService";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { fetchUserRecord } from "@/services/userService";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const tasks = await getTasks(session!.userId);
  return Response.json(tasks);
}

export async function POST(req: Request) {
  const { title, description, status } = await req.json();
  const user = await fetchUserRecord();

  if (!title || !user?.teamId) {
    return Response.json(
      { error: "Title and Team Id are required" },
      { status: 400 }
    );
  }

  try {
    const task = await createTask({
      title,
      description,
      status,
      teamId: user.teamId,
    });
    return Response.json(task, { status: 201 });
  } catch (error) {
    return Response.json(error);
  }
}
