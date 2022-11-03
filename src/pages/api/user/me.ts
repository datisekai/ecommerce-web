import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "../../../server/db/client";

const userMe = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Missing token" });
    }

    try {
      const decode: any = jwt.verify(
        token as string,
        process.env.NEXT_PUBLIC_JWT as string
      );

      if (decode) {
        const myUser: any = await prisma?.user.findFirst({
          where: {
            id: decode.id,
          },
          include: {
            permission: true,
            contacts: true,
          },
        });

        if (myUser) {
          const actions = await prisma?.action.findMany({
            where: {
              perId: myUser.perId,
            },
          });
          return res
            .status(200)
            .json({ ...myUser, password: undefined, actions });
        }
      }
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
  }
};

export default userMe;
