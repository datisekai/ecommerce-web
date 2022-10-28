import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import INextApiRequest from "../src/models/NextApiRequest";

const withProtected = (handler: any) => {
  return async (req: INextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Missing token" });
    }

    const decode: any = jwt.verify(
      token as string,
      process.env.NEXT_PUBLIC_JWT as string
    );

    if (decode) {
      const myUser = await prisma?.user.findFirst({
        where: {
          id: decode.id,
        },
        include: {
          permission: true,
        },
      });

      if (myUser) {
        const actions = await prisma?.action.findMany({
          where: {
            perId: myUser.perId,
          },
        });

        req.actions = actions;
        req.userId = myUser.id;

        return handler(req, res);
      }
    }

    return res.status(401).json({ success: false, message: "No Authorized" });
  };
};

export default withProtected;