// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import argon2 from "argon2";

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
        .json({ success: false, message: "phone number is exist" });
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

      return res.status(200).json(newUser);
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  }
};

export default Register;
