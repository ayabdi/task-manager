import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

import { getSession } from "next-auth/react";

export function withAuth(next: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ message: "Unauthorized" });

      return;
    }

    req.user = session.user;
    return next(req, res);
  };
}
