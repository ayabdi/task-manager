import { TeamController } from '@/interfaces/controllers/TeamController'

/**
 * Handles POST requests to assign a user to a team.
 * @param req The incoming HTTP request.
 * @returns A Response object with a success message or an error message.
 */
export async function POST(req: Request) {
  return TeamController.assignUserToTeam(req)
}
