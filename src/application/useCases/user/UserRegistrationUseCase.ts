// src/application/useCases/UserRegistrationUseCase.ts

import { IUserRepository } from '@/domain/repositories/IUserRepository'
import { User } from '@/domain/entities/User'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

/**
 * Data Transfer Object for user registration.
 */
interface RegisterUserDTO {
  name: string
  email: string
  password: string
}

/**
 * Use case for registering a new user.
 */
export class UserRegistrationUseCase {
  /**
   * Constructs a new UserRegistrationUseCase instance.
   * @param userRepository - The repository instance for accessing users.
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Executes the use case to register a user.
   * @param data - The data required to register the user.
   * @returns A promise that resolves to the created User entity.
   * @throws Will throw an error if validation fails or user already exists.
   */
  async execute(data: RegisterUserDTO): Promise<User> {
    // Input Validation
    if (!data.email || !data.password || !data.name) {
      throw new Error('Email, password, and name are required')
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format')
    }

    // Validate password strength (at least 8 characters)
    const passwordRegex = /^.{8,}$/
    if (!passwordRegex.test(data.password)) {
      throw new Error('Password must be at least 8 characters long')
    }

    // Check if the user already exists
    const existingUser = await this.userRepository.findByEmail(data.email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Create a new User entity
    const user = new User(
      uuidv4(),
      data.name || null,
      data.email,
      hashedPassword,
      null // teamId will be null initially
    )

    // Save the user using the repository
    return this.userRepository.create(user)
  }
}
