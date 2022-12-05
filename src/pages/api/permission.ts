// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import withProtected from "../../../middlewares/withProtected";
import INextApiRequest from "../../models/NextApiRequest";
import { prisma } from "../../server/db/client";
import { logError } from "../../utils/logError";

const Permission = async (req: INextApiRequest, res: NextApiResponse) => {
  console.log(req.method);
  if (req.method === "POST") {
    if (
      !req.actions?.some((item: any) => item.code === "admin:permission:add")
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
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
  } else if (req.method === "GET") {
    if (
      !req.actions?.some((item: any) => item.code === "admin:permission:read")
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    try {
      const permissions = await prisma.permission.findMany({
        include: {
          actions: true,
        },
        orderBy: {
          id: "desc",
        },
      });
      return res.json(permissions);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "DELETE") {
    if (
      !req.actions?.some((item: any) => item.code === "admin:permission:delete")
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    const { id } = req.query;
    if (!id) {
      return res.status(404).json({ success: false, message: "Missing id" });
    }

    try {
      const deletePermission = await prisma.permission.delete({
        where: {
          id: Number(id),
        },
      });

      return res.json(deletePermission);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "PUT") {
    if (
      !req.actions?.some((item: any) => item.code === "admin:permission:update")
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
    const data = req.body;
    if (!data?.id) {
      return res.status(404).json({ success: false, message: "Missing id" });
    }

    try {
      const updatePermission = await prisma.permission.update({
        where: {
          id: Number(data?.id),
        },
        data: { ...data, id: undefined },
      });
      return res.json(updatePermission);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default withProtected(Permission);
