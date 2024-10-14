import { Team } from '../entities/Team';

/**
 * Interface defining the team repository methods.
 */
export interface ITeamRepository {
  findById(id: string): Promise<Team | null>;
  findAll(): Promise<Team[]>;
  create(team: Team): Promise<Team>;
  update(team: Team): Promise<Team>;
  delete(id: string): Promise<void>;
  assignUserToTeam(userId: string, teamId: string): Promise<void>;
}