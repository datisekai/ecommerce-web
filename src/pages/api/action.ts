import { logError } from "./../../utils/logError";
// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import INextApiRequest from "../../models/NextApiRequest";
import { prisma } from "../../server/db/client";
import withProtected from "../../../middlewares/withProtected";

const Actions = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (
      !req.actions?.some((item: any) => item.code === "admin:privilege:add")
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
    const { name, code, perListId } = req.body;

    if (!name || !code || !perListId) {
      return res.status(404).json({ success: false, message: "Missing" });
    }
    const newAction = await prisma.privilege.create({
      data: {
        name,
        code,
        perListId: +perListId,
      },
    });

    return res.status(200).json(newAction);
  } else if (req.method === "PUT") {
    if (
      !req.actions?.some((item: any) => item.code === "admin:privilege:update")
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    const data = req.body;

    if (!data.code) {
      return res.status(404).json({ success: false, message: "Missing code" });
    }

    try {
      const updateAction = await prisma.privilege.update({
        where: {
          code: data.code,
        },
        data: { ...data, code: undefined },
      });
      return res.json(updateAction);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "DELETE") {
    if (
      !req.actions?.some((item: any) => item.code === "admin:privilege:delete")
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    const { code } = req.query;
    if (!code) {
      return res
        .status(404)
        .json({ success: false, message: "Internal server" });
    }

    try {
      const deleteAction = await prisma.privilege.delete({
        where: {
          code: code as string,
        },
      });
      return res.json(deleteAction);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "GET") {
    if (
      !req.actions?.some((item: any) => item.code === "admin:privilege:read")
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    try {
      const actions = await prisma.privilege.findMany({
        include: {
          perList: true,
          Action: true,
        },
      });
      return res.json(actions);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default withProtected(Actions);
