// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name } = req.body;

    if (!name) {
      return res.status(404).json({ success: false, message: "Missing name" });
    }
    const newPermission = await prisma.permission.create({
      data: {
        name,
      },
    });

    return res.status(200).json(newPermission);
  }
};

export default Register;
