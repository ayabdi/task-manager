import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../middleware/withAuth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Your logic here

  const tasks = await prisma.task.findMany();
  res.status(200).json(tasks);
};

export default withAuth(handler);
