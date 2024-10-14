import { UserRegistrationUseCase } from '@/application/useCases/user/UserRegistrationUseCase'
import { IUserRepository } from '@/domain/repositories/IUserRepository'
import { User } from '@/domain/entities/User'
import bcrypt from 'bcrypt'

jest.mock('bcrypt')

const mockUserRepository: IUserRepository = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  create: jest.fn()
}

describe('UserRegistrationUseCase', () => {
  let userRegistrationUseCase: UserRegistrationUseCase

  beforeEach(() => {
    userRegistrationUseCase = new UserRegistrationUseCase(mockUserRepository)
    jest.clearAllMocks()
  })

  it('should register a new user with valid data', async () => {
    // Arrange
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    }

    // Mock repository to not find an existing user
    ;(mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(null)

    // Mock bcrypt to return a hashed password
    ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123')

    // Mock repository to return the created user
    ;(mockUserRepository.create as jest.Mock).mockImplementation(async (user: User) => user)

    // Act
    const result = await userRegistrationUseCase.execute(userData)

    // Assert
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email)
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10)
    expect(mockUserRepository.create).toHaveBeenCalledWith(expect.any(User))
    expect(result).toBeInstanceOf(User)
    expect(result.email).toBe(userData.email)
    expect(result.password).toBe('hashedPassword123')
  })

  it('should throw an error if the email is already in use', async () => {
    // Arrange
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    }

    // Mock repository to find an existing user
    ;(mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(
      new User('user-123', userData.name, userData.email, 'hashedPassword', null)
    )

    // Act & Assert
    await expect(userRegistrationUseCase.execute(userData)).rejects.toThrow('User already exists')
  })

  it('should throw an error if email format is invalid', async () => {
    // Arrange
    const userData = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'password123'
    }

    // Act & Assert
    await expect(userRegistrationUseCase.execute(userData)).rejects.toThrow('Invalid email format')
  })

  it('should throw an error if password is less than 8 characters', async () => {
    // Arrange
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'short'
    }

    // Act & Assert
    await expect(userRegistrationUseCase.execute(userData)).rejects.toThrow(
      'Password must be at least 8 characters long'
    )
  })
})
