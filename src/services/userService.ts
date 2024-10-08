import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export const createUser = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name?: string;
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      // Create a default team
      Team: {
        create: {
          name: `${name}'s Team`,
        },
      },
    },
  });
};

export const fetchUserRecord = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.userId) throw new Error("No user")

  return prisma.user.findUnique({
    where: {
      id: session?.userId!
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};
