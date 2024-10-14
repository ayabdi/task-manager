import { UserController } from '@/interfaces/controllers/UserController'

/**
 * Handles POST requests to sign up a new user.
 * @param req The incoming HTTP request.
 * @returns A Response object with the created user or an error message.
 */
export async function POST(req: Request) {
  return UserController.registerUser(req)
}
