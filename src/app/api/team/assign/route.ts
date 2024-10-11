import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { assignUserToTeam } from "@/services/teamService";

// Handles the POST request to assign a user to a team
export async function POST(req: Request) {
  // Retrieve the session information
  const session = await getServerSession(authOptions);
  
  // Parse the request body to get the teamId
  const { teamId } = await req.json();
  
  // Check if teamId is provided
  if (!teamId) {
    return Response.json({ error: "Team Id is missing" }, { status: 401 });
  }
  
  try {
    // Assign the user to the specified team
    await assignUserToTeam(session!.userId, teamId);
    return Response.json({ message: "Success" });
  } catch (error) {
    // Handle any errors that occur during the assignment
    return Response.json(error);
  }
}
