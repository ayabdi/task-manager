import { CreateTeamUseCase } from '@/application/useCases/team/CreateTeamUseCase';
import { AssignUserToTeamUseCase } from '@/application/useCases/team/AssignUserToTeamUseCase';
import { PrismaTeamRepository } from '../../infrastructure/repositories/PrismaTeamRepository';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions';

export class TeamController {
  /**
   * Handles the creation of a new team.
   * @param req The incoming HTTP request.
   * @returns A Response object with the created team or an error message.
   */
  static async createTeam(req: Request): Promise<Response> {
    try {
      const { name, description } = await req.json();

      // Validate required fields
      if (!name) {
        return new Response(
          JSON.stringify({ error: 'Name is required' }),
          { status: 400 }
        );
      }

      // Create instances of the repository and use case
      const teamRepository = new PrismaTeamRepository();
      const createTeamUseCase = new CreateTeamUseCase(teamRepository);

      // Execute the use case to create a new team
      const team = await createTeamUseCase.execute({ name, description });

      return new Response(JSON.stringify(team), { status: 201 });
    } catch (error: any) {
      // Handle any errors and return a 500 status code
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }

  /**
   * Handles assigning a user to a team.
   * @param req The incoming HTTP request.
   * @returns A Response object with a success message or an error message.
   */
  static async assignUserToTeam(req: Request): Promise<Response> {
    try {
      const session = await getServerSession(authOptions);

      // Check if the user is authenticated
      if (!session?.userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }

      const { teamId } = await req.json();

      // Validate required fields
      if (!teamId) {
        return new Response(
          JSON.stringify({ error: 'Team ID is required' }),
          { status: 400 }
        );
      }

      // Create instances of the repository and use case
      const teamRepository = new PrismaTeamRepository();
      const assignUserToTeamUseCase = new AssignUserToTeamUseCase(teamRepository);

      // Execute the use case to assign the user to the team
      await assignUserToTeamUseCase.execute({
        userId: session.userId,
        teamId,
      });

      return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
    } catch (error: any) {
      // Handle any errors and return a 500 status code
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
}