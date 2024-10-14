import { Team } from '@/domain/entities/Team'
import { ITeamRepository } from '@/domain/repositories/ITeamRepository'
import { v4 as uuidv4 } from 'uuid'

interface CreateTeamDTO {
  name: string
  description?: string
}

export class CreateTeamUseCase {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(data: CreateTeamDTO): Promise<Team> {
    // Create a new Team entity
    const team = new Team(
      uuidv4(),
      data.name,
      data.description || null,
      [] // Initial member IDs are empty
    )

    // Save the team using the repository
    return this.teamRepository.create(team)
  }
}
