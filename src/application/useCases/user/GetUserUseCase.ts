import { User } from '@/domain/entities/User'
import { IUserRepository } from '@/domain/repositories/IUserRepository'

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    // Fetch the user by ID
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
}
