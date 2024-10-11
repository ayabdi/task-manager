import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Fetch all teams from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of teams.
 */
export const getTeams = async () => {
  return prisma.team.findMany();
};

/**
 * Fetch a team by its ID.
 * @param {string} id - The ID of the team to fetch.
 * @returns {Promise<Object|null>} A promise that resolves to the team object or null if not found.
 */
export const getTeamById = async (id: string) => {
  return prisma.team.findUnique({
    where: { id },
  });
};

/**
 * Create a new team.
 * @param {Object} teamData - The data for the new team.
 * @param {string} teamData.name - The name of the team.
 * @param {string} [teamData.description] - An optional description of the team.
 * @returns {Promise<Object>} A promise that resolves to the created team object.
 */
export const createTeam = async ({
  name,
  description,
}: {
  name: string;
  description?: string;
}) => {
  return prisma.team.create({
    data: {
      name,
      description,
    },
  });
};

/**
 * Update an existing team.
 * @param {string} id - The ID of the team to update.
 * @param {Object} updates - The updates to apply to the team.
 * @param {string} userId - The ID of the user attempting to update the team.
 * @returns {Promise<Object>} A promise that resolves to the updated team object.
 * @throws {Error} If the team does not exist or the user is not a member of the team.
 */
export const updateTeam = async (
  id: string,
  updates: Partial<{
    name: string;
    description: string;
  }>,
  userId: string // Check if the user is a member of the team
) => {
  const team = await prisma.team.findUnique({
    where: { id },
    include: { members: true }, // Include members to verify user membership
  });

  if (!team) {
    throw new Error("Team does not exist");
  }

  const isMember = team.members.some(member => member.id === userId);
  if (!isMember) {
    throw new Error("User is not a member of the team"); // Only members can update the team
  }

  return prisma.team.update({
    where: { id },
    data: updates,
  });
};

/**
 * Delete a team.
 * @param {string} id - The ID of the team to delete.
 * @param {string} userId - The ID of the user attempting to delete the team.
 * @returns {Promise<Object>} A promise that resolves to the deleted team object.
 * @throws {Error} If the team does not exist or the user is not a member of the team.
 */
export const deleteTeam = async (id: string, userId: string) => {
  const team = await prisma.team.findUnique({
    where: { id },
    include: { members: true }, // Include members to verify user membership
  });

  if (!team) {
    throw new Error("Team does not exist");
  }

  const isMember = team.members.some(member => member.id === userId);
  if (!isMember) {
    throw new Error("User is not a member of the team"); // Only members can delete the team
  }

  return prisma.team.delete({
    where: { id },
  });
};

/**
 * Assign a user to a team.
 * @param {string} userId - The ID of the user to assign.
 * @param {string} teamId - The ID of the team to assign the user to.
 * @returns {Promise<Object>} A promise that resolves to the updated user object.
 */
export const assignUserToTeam = async (userId: string, teamId: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      teamId: teamId,
    },
  });
};
