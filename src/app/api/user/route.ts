import { fetchUserRecord } from "@/services/userService";

// Handles GET requests to fetch user information
export async function GET(req: Request) {
  // Fetch the user record from the service
  const userRecord = await fetchUserRecord();

  // Check if the user record exists
  if (!userRecord) {
    // Return a 404 response if the user is not found
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // Return the user information in the response
  return Response.json({
    name: userRecord.name,
    email: userRecord.email,
    teamId: userRecord.teamId
  });
}