import { createTask } from "@/services/taskService";
import { fetchUserRecord } from "@/services/userService";

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
