import argon2 from "argon2";
// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import jwt from "jsonwebtoken";

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res
        .status(404)
        .json({ success: false, message: "Missing phone or password" });
    }

    const isExist = await prisma.user.findMany({
      where: {
        phone,
      },
    });

    if (isExist?.length !== 1) {
      return res
        .status(404)
        .json({ success: false, message: "Phone or password is incorrect" });
    }

    try {
      const isTrue = await argon2.verify(
        isExist[0]?.password as string,
        password
      );
      if (isTrue) {
        const token = jwt.sign(
          {
            id: isExist[0]?.id,
          },
          process.env.NEXT_PUBLIC_JWT as string,
          { expiresIn: "12h" }
        );

        return res.status(200).json({ token });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Phone or password is incorrect" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  }
};

export default Login;
