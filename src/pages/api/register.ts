// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
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

    if (isExist?.length > 0) {
      return res
        .status(404)
        .json({ success: false, message: "Phone number was exist" });
    }

    try {
      const hashPassword = await argon2.hash(password);

      const newUser = await prisma.user.create({
        data: {
          phone,
          password: hashPassword,
          isActive: true,
          perId: 1,
        },
      });

      const token = jwt.sign(
        {
          id: newUser.id,
        },
        process.env.NEXT_PUBLIC_JWT as string,
        { expiresIn: "12h" }
      );

      return res.status(200).json({ token });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  }
};

export default Register;
