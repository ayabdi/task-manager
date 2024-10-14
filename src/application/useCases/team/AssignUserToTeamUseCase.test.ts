import { AssignUserToTeamUseCase } from '@/application/useCases/team/AssignUserToTeamUseCase'
import { ITeamRepository } from '@/domain/repositories/ITeamRepository'

const mockTeamRepository: ITeamRepository = {
  findById: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  assignUserToTeam: jest.fn()
}

describe('AssignUserToTeamUseCase', () => {
  let assignUserToTeamUseCase: AssignUserToTeamUseCase

  beforeEach(() => {
    assignUserToTeamUseCase = new AssignUserToTeamUseCase(mockTeamRepository)
    jest.clearAllMocks()
  })

  it('should assign a user to a team with valid data', async () => {
    // Arrange
    const data = {
      userId: 'user-123',
      teamId: 'team-456'
    }

    // Mock the repository method
    ;(mockTeamRepository.assignUserToTeam as jest.Mock).mockResolvedValue()

    // Act
    await assignUserToTeamUseCase.execute(data)

    // Assert
    expect(mockTeamRepository.assignUserToTeam).toHaveBeenCalledWith(data.userId, data.teamId)
  })

  it('should throw an error if userId is missing', async () => {
    // Arrange
    const data = {
      userId: '',
      teamId: 'team-456'
    }

    // Act & Assert
    await expect(assignUserToTeamUseCase.execute(data)).rejects.toThrow('User ID and Team ID are required')
  })

  it('should throw an error if teamId is missing', async () => {
    // Arrange
    const data = {
      userId: 'user-123',
      teamId: ''
    }

    // Act & Assert
    await expect(assignUserToTeamUseCase.execute(data)).rejects.toThrow('User ID and Team ID are required')
  })
})
