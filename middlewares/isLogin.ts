import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import INextApiRequest from "../src/models/NextApiRequest";

const isLogin = (handler: any) => {
  return async (req: any, res: NextApiResponse) => {
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
        req.id = myUser.id;
        return handler(req, res);
      }
    }

    return res.status(401).json({ success: false, message: "No Authorized" });
  };
};

export default isLogin;
