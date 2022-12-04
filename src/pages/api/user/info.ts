import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import isLogin from "../../../../middlewares/isLogin";
import { prisma } from "../../../server/db/client";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import missing from "../../../utils/missing";
import argon2 from "argon2";
import notAuthorized from "../../../utils/notAuthorized";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const data = req.body;
    console.log(data);
    try {
      const currentUser = await prisma.user.update({
        where: {
          id: req.userId,
        },
        data: {
          ...data,
          date: new Date(data.date),
        },
        select: {
          date: true,
          email: true,
          gender: true,
          id: true,
          image: true,
          isActive: true,
          name: true,
          nameShop: true,
          phone: true,
        },
      });
      return res.json(currentUser);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "PATCH") {
    const { password, newPassword } = req.body;
    try {
      const currentUser = await prisma.user.findFirst({
        where: {
          id: req.userId,
        },
      });
      if (!currentUser) {
        return missing(res);
      }

      if (await argon2.verify(currentUser.password, password)) {
        const hash = await argon2.hash(newPassword);
        await prisma.user.update({
          where: {
            id: req.userId,
          },
          data: {
            password: hash,
          },
        });
        return res.json("success");
      } else {
        return notAuthorized(res);
      }
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default isLogin(handler);
