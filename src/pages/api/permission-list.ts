import { logError } from "./../../utils/logError";
// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import INextApiRequest from "../../models/NextApiRequest";
import { prisma } from "../../server/db/client";
import withProtected from "../../../middlewares/withProtected";

const PermissionList = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (
      !req.actions?.some(
        (item: any) => item.code === "admin:permission-list:add"
      )
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
    const { name } = req.body;

    if (!name) {
      return res.status(404).json({ success: false, message: "Missing" });
    }
    try {
      const newPermissionList = await prisma.permissionList.create({
        data: {
          name,
        },
      });

      return res.status(200).json(newPermissionList);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "GET") {
    if (
      !req.actions?.some(
        (item: any) => item.code === "admin:permission-list:read"
      )
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
    try {
      const permissionLists = await prisma.permissionList.findMany({
        include: {
          actions: true,
        },
      });

      return res.json(permissionLists);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "DELETE") {
    if (
      !req.actions?.some(
        (item: any) => item.code === "admin:permission-list:delete"
      )
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
      const deletePermissionList = await prisma.permissionList.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json(deletePermissionList);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "PUT") {
    if (
      !req.actions?.some(
        (item: any) => item.code === "admin:permission-list:update"
      )
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
      const updatePermissionList = await prisma.permissionList.update({
        where: {
          id: Number(data.id),
        },
        data: { ...data, id: undefined },
      });
      return res.json(updatePermissionList);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default withProtected(PermissionList);
