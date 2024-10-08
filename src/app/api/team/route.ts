import { getTeams } from "@/services/teamService"

export async function GET(req: Request) {
    const teams = await getTeams()
    return Response.json(teams)
}