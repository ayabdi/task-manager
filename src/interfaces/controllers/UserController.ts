import { PrismaUserRepository } from '@/infrastructure/repositories/PrismaUserRepository'
import { UserRegistrationUseCase } from '@/application/useCases/user/UserRegistrationUseCase'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { GetUserUseCase } from '@/application/useCases/user/GetUserUseCase'

/**
 * Controller for handling user-related HTTP requests.
 */
export class UserController {
  /**
   * Retrieves the authenticated user's information.
   * @param req The incoming HTTP request.
   * @returns A Response object with the user's info or an error message.
   */
  static async getUser(): Promise<Response> {
    try {
      const session = await getServerSession(authOptions)

      // Check if the user is authenticated
      if (!session?.userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
      }

      // Create instances of the repository and use case
      const userRepository = new PrismaUserRepository()
      const getUserUseCase = new GetUserUseCase(userRepository)

      // Execute the use case to retrieve the user
      const user = await getUserUseCase.execute(session.userId)

      // Return the user information (excluding password)
      const userWithoutPassword = {
        name: user.name,
        email: user.email,
        teamId: user.teamId
      }
      return new Response(JSON.stringify(userWithoutPassword), { status: 200 })
    } catch (error: any) {
      // Handle any errors and return a 500 status code
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
  }

  /**
   * Handles user registration (sign-up).
   * @param req The incoming HTTP request.
   * @returns A Response object with the created user or an error message.
   */
  static async registerUser(req: Request): Promise<Response> {
    try {
      // Extract user data from the request body
      const { name, email, password } = await req.json()

      // Create instances of the repository and use case
      const userRepository = new PrismaUserRepository()
      const userRegistrationUseCase = new UserRegistrationUseCase(userRepository)

      // Execute the use case to register the user
      const user = await userRegistrationUseCase.execute({ name, email, password })

      // Return the created user (excluding password)
      const userWithoutPassword = {
        name: user.name,
        email: user.email,
        teamId: user.teamId
      }

      return new Response(JSON.stringify(userWithoutPassword), { status: 201 })
    } catch (error: any) {
      if (error.message === 'User already exists') {
        return new Response(JSON.stringify({ error: error.message }), { status: 409 })
      } else if (
        error.message === 'Email, password, and name are required' ||
        error.message === 'Invalid email format' ||
        error.message === 'Password must be at least 8 characters long' ||
        error.message === 'Invalid data'
      ) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 })
      } else {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
      }
    }
  }
}
