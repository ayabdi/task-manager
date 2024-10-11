import { createTask } from "@/services/taskService";
import { fetchUserRecord } from "@/services/userService";

// Handles the creation of a new task
export async function POST(req: Request) {
  // Parse the request body
  const { title, description, status } = await req.json();
  
  // Fetch the user record to get team information
  const user = await fetchUserRecord();

  // Validate required fields
  if (!title || !user?.teamId) {
    return Response.json(
      { error: "Title and Team Id are required" },
      { status: 400 }
    );
  }

  try {
    // Create a new task with the provided details
    const task = await createTask({
      title,
      description,
      status,
      teamId: user.teamId,
    });
    // Return the created task with a success status
    return Response.json(task, { status: 201 });
  } catch (error) {
    // Handle errors during task creation
    return Response.json(error);
  }
}
