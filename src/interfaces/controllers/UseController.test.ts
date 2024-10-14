import { UserController } from '../../../src/interfaces/controllers/UserController'
import { UserRegistrationUseCase } from '../../../src/application/useCases/user/UserRegistrationUseCase'
import { PrismaUserRepository } from '@/infrastructure/repositories/PrismaUserRepository'

jest.mock('../../../src/application/useCases/user/UserRegistrationUseCase')

describe('UserController', () => {
  describe('registerUser', () => {
    let mockReq: Partial<Request>
    let mockUseCaseInstance: jest.Mocked<UserRegistrationUseCase>

    beforeEach(() => {
      mockReq = {}
      ;(UserRegistrationUseCase as jest.MockedClass<typeof UserRegistrationUseCase>).mockClear()
      mockUseCaseInstance = new UserRegistrationUseCase(
        {} as PrismaUserRepository
      ) as jest.Mocked<UserRegistrationUseCase>
      ;(UserRegistrationUseCase as jest.MockedClass<typeof UserRegistrationUseCase>).mockImplementation(
        () => mockUseCaseInstance
      )
    })

    it('should return 201 and user data on successful registration', async () => {
      // Arrange
      const userData = { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' }
      mockReq.json = jest.fn().mockResolvedValue(userData)
      const expectedUser = { name: 'John Doe', email: 'john.doe@example.com' } // Adjusted expectedUser
      mockUseCaseInstance.execute.mockResolvedValue(expectedUser)

      // Act
      const response = await UserController.registerUser(mockReq as Request)

      // Assert
      expect(mockUseCaseInstance.execute).toHaveBeenCalledWith(userData)
      expect(response.status).toBe(201)
      const responseBody = await response.json()
      expect(responseBody).toEqual(expectedUser) // This should now match
    })

    it('should return 400 if validation fails', async () => {
      // Arrange
      const userData = { name: '', email: 'invalid-email', password: 'short' }
      mockReq.json = jest.fn().mockResolvedValue(userData)
      mockUseCaseInstance.execute.mockRejectedValue(new Error('Invalid data'))

      // Act
      const response = await UserController.registerUser(mockReq as Request)

      // Assert
      expect(mockUseCaseInstance.execute).toHaveBeenCalledWith(userData)
      expect(response.status).toBe(400)
      const responseBody = await response.json()
      expect(responseBody).toEqual({ error: 'Invalid data' })
    })
  })
})
