import { ITeamRepository } from '../../domain/repositories/ITeamRepository';
import { Team } from '../../domain/entities/Team';
import prisma from '../prisma/client';

/**
 * Repository implementation for teams using Prisma as the ORM.
 */
export class PrismaTeamRepository implements ITeamRepository {
  async findById(id: string): Promise<Team | null> {
    const teamData = await prisma.team.findUnique({
      where: { id },
      include: { members: true },
    });
    if (!teamData) return null;

    const memberIds = teamData.members.map((member) => member.id);

    return new Team(
      teamData.id,
      teamData.name,
      teamData.description,
      memberIds
    );
  }

  async findAll(): Promise<Team[]> {
    const teamsData = await prisma.team.findMany({
      include: { members: true },
    });

    return teamsData.map((teamData) => {
      const memberIds = teamData.members.map((member) => member.id);
      return new Team(
        teamData.id,
        teamData.name,
        teamData.description,
        memberIds
      );
    });
  }

  async create(team: Team): Promise<Team> {
    const teamData = await prisma.team.create({
      data: {
        id: team.id,
        name: team.name,
        description: team.description,
      },
    });

    return new Team(
      teamData.id,
      teamData.name,
      teamData.description,
      []
    );
  }

  async update(team: Team): Promise<Team> {
    const teamData = await prisma.team.update({
      where: { id: team.id },
      data: {
        name: team.name,
        description: team.description,
      },
      include: { members: true },
    });

    const memberIds = teamData.members.map((member) => member.id);

    return new Team(
      teamData.id,
      teamData.name,
      teamData.description,
      memberIds
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.team.delete({ where: { id } });
  }

  async assignUserToTeam(userId: string, teamId: string): Promise<void> {
    // Update the user's teamId
    await prisma.user.update({
      where: { id: userId },
      data: {
        teamId,
      },
    });
  }
}