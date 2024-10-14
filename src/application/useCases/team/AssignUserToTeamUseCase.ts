import { ITeamRepository } from '../../../domain/repositories/ITeamRepository'

interface AssignUserToTeamDTO {
  userId: string
  teamId: string
}

export class AssignUserToTeamUseCase {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(data: AssignUserToTeamDTO): Promise<void> {
    // Validate input data
    if (!data.userId || !data.teamId) {
      throw new Error('User ID and Team ID are required')
    }

    // Assign the user to the team
    await this.teamRepository.assignUserToTeam(data.userId, data.teamId)
  }
}