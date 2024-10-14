import { User } from '../entities/User'

/**
 * Interface defining the user repository methods.
 */
export interface IUserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: User): Promise<User>
}
