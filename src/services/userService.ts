import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const createUser = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name?: string;
}) => {
  const prisma = new PrismaClient();
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  const prisma = new PrismaClient();
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};
