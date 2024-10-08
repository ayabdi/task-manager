import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { assignUserToTeam } from "@/services/teamService";


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { teamId } = await req.json();
  if (!teamId) {
    return Response.json({ error: "Team Id is missing" }, { status: 401 });
  }
  try {
    await assignUserToTeam(session!.userId, teamId);
    return Response.json({ message: "Success" })
  } catch (error) {
    return Response.json(error);
  }
}
