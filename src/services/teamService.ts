import prisma from "@/infrastructure/prisma/client";

/**
 * Fetch all teams from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of teams.
 */
export const getTeams = async () => {
  return prisma.team.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};

