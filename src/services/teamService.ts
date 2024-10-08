import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getTeams = async () => {
  return prisma.team.findMany();
};

export const getTeamById = async (id: string) => {
  return prisma.team.findUnique({
    where: { id },
  });
};

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

export const updateTeam = async (
  id: string,
  updates: Partial<{
    name: string;
    description: string;
  }>,
  userId: string // Added userId parameter to check for existing user
) => {
  const team = await prisma.team.findUnique({
    where: { id },
    include: { members: true }, // Include members to check if the user is part of the team
  });

  if (!team) {
    throw new Error("Team does not exist");
  }

  const isMember = team.members.some(member => member.id === userId);
  if (!isMember) {
    throw new Error("User is not a member of the team"); // Ensure only existing users in the team can update it
  }

  return prisma.team.update({
    where: { id },
    data: updates,
  });
};

export const deleteTeam = async (id: string, userId: string) => {
  const team = await prisma.team.findUnique({
    where: { id },
    include: { members: true }, // Include members to check if the user is part of the team
  });

  if (!team) {
    throw new Error("Team does not exist");
  }

  const isMember = team.members.some(member => member.id === userId);
  if (!isMember) {
    throw new Error("User is not a member of the team"); // Ensure only existing members can delete the team
  }

  return prisma.team.delete({
    where: { id },
  });
};

export const assignUserToTeam = async (userId: string, teamId: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      teamId: teamId,
    },
  });
};

