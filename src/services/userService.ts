import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/infrastructure/prisma/client'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'


/**
 * Create a new user in the database.
 * @param {Object} userData - The data for the new user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @param {string} [userData.name] - The optional name of the user.
 * @returns {Promise<Object>} The created user object.
 */
export const createUser = async ({
  email,
  password,
  name
}: {
  email: string
  password: string
  name?: string
}) => {
  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create a new user with a default team
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      Team: {
        create: {
          name: `${name}'s Team` // Default team name
        }
      }
    }
  })
}

/**
 * Fetch the current user's record from the database.
 * @returns {Promise<Object>} The user's record containing name, email, and teamId.
 * @throws {Error} If no user is found or the user does not exist.
 */
export const fetchUserRecord = async (userId?: string) => {
  if (!userId) {
    const session = await getServerSession(authOptions)
    // Check if the user is authenticated
    if (!session?.userId) throw new Error('No user')
    userId = session.userId
  }

  // Fetch the user from the database
  const user = await prisma.user.findUnique({
    where: {
      id: userId!
    }
  })

  // Check if the user exists
  if (!user) throw new Error('User Not found')

  // Return the user's details
  return {
    name: user.name,
    email: user.email,
    teamId: user.teamId
  }
}

/**
 * Retrieve a user by their email address.
 * @param {string} email - The email of the user to fetch.
 * @returns {Promise<Object|null>} The user object or null if not found.
 */
export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email
    }
  })
}
