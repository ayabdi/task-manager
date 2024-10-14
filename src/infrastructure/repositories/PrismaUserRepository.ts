import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import prisma from '../prisma/client';


/**
 * Repository implementation for users using Prisma as the ORM.
 */
export class PrismaUserRepository implements IUserRepository {
  /**
   * Finds a user by their ID.
   */
  async findById(id: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({ where: { id } });
    if (!userData) return null;

    return new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.teamId
    );
  }

  /**
   * Finds a user by their email.
   */
  async findByEmail(email: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({ where: { email } });
    if (!userData) return null;

    return new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.teamId
    );
  }

  /**
   * Creates a new user in the database.
   */
  async create(user: User): Promise<User> {
    const userData = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        teamId: user.teamId,
      },
    });

    return new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.teamId
    );
  }

  // Implement other methods as needed...
}