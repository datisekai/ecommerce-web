// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */
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
      const newUser = await prisma.user.create({
        data: {
          phone,
          password,
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
