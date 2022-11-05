import { NextApiResponse } from "next";
import INextApiRequest from "../../models/NextApiRequest";
import missing from "../../utils/missing";
import jwt from "jsonwebtoken";
import { prisma } from "../../server/db/client";
import { setCookie } from "cookies-next";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { token } = req.body;
    if (!token) {
      return missing(res);
    }

    try {
      const decode: any = jwt.verify(
        token as string,
        process.env.NEXT_PUBLIC_JWT as string
      );

      if (decode) {
        const myUser = await prisma?.user.findFirst({
          where: {
            email: decode.email,
          },
          include: {
            permission: true,
          },
        });

        if (myUser) {
          const token = jwt.sign(
            {
              id: myUser.id,
            },
            process.env.NEXT_PUBLIC_JWT as string,
            { expiresIn: "12h" }
          );

          return res.json({ token });
        }
      }

      return res.status(401).json({ success: false, message: "No Authorized" });
    } catch (error) {
      return res.status(401).json({ success: false, message: "No Authorized" });
    }
  }
};

export default handler;
