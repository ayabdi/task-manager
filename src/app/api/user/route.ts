import { fetchUserRecord } from "@/services/userService";

export async function GET(req: Request) {
  const userRecord = await fetchUserRecord();

  if (!userRecord) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }
  return Response.json({
    name: userRecord.name,
    email: userRecord.email,
    teamId: userRecord.teamId
  });
}