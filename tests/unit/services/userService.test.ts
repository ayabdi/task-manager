import { createUser, fetchUserRecord, getUserByEmail } from '@/services/userService'
import { prismaMock } from '../../../jest.setup'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword')
}))

describe('User Service', () => {
  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        email: `test${Date.now()}@example.com`, // Use a unique email
        password: 'password123',
        name: 'Test User'
      }

      const expectedUser = {
        email: userData.email,
        name: 'Test User',
        password: 'hashedPassword'
      }

      prismaMock.user.create.mockResolvedValue({
        id: 'user-123',
        ...expectedUser,
        createdAt: new Date(),
        updatedAt: new Date(),
        teamId: 'team-123'
      })

      const result = await createUser(userData)

      expect(result).toEqual(expect.objectContaining(expectedUser))
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
    })
  })

  describe('fetchUserRecord', () => {
    it('should fetch the current user record', async () => {
        const user = {
            id: 'some-id',
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'hashed-password', // Add this property
            createdAt: new Date(),       // Add this property
            updatedAt: new Date(),       // Add this property
            teamId: 'some-team-id'
          };

      // Mock the database call to return the user
      prismaMock.user.findUnique.mockResolvedValue(user)

      // Call the function
      const result = await fetchUserRecord('some-id')

      expect(result).toEqual({ name: 'John Doe', email: 'john.doe@example.com', teamId: 'some-team-id' })
    })
  })

  describe('getUserByEmail', () => {
    it('should retrieve a user by email', async () => {
      const user = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        teamId: 'team-123'
      }

      prismaMock.user.findUnique.mockResolvedValue(user)

      const result = await getUserByEmail('test@example.com')

      expect(result).toEqual(
        expect.objectContaining({
          email: 'test@example.com',
          name: 'Test User'
        })
      )
    })
  })
})
