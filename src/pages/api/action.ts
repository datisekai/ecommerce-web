import { logError } from "./../../utils/logError";
// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import INextApiRequest from "../../models/NextApiRequest";
import { prisma } from "../../server/db/client";
import withProtected from "../../../middlewares/withProtected";

const Actions = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.actions?.some((item: any) => item.code === "admin:action:add")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
    const { name, code, perListId, perId } = req.body;

    if (!name || !code || !perListId || !perId) {
      return res.status(404).json({ success: false, message: "Missing" });
    }
    const newAction = await prisma.action.create({
      data: {
        name,
        code,
        perId: +perId,
        perListId: +perListId,
      },
    });

    return res.status(200).json(newAction);
  } else if (req.method === "PUT") {
    if (
      !req.actions?.some((item: any) => item.code === "admin:action:update")
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    const data = req.body;

    if (!data.id) {
      return res.status(404).json({ success: false, message: "Missing id" });
    }

    try {
      const updateAction = await prisma.action.update({
        where: {
          id: Number(data.id),
        },
        data: { ...data, id: undefined },
      });
      return res.json(updateAction);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "DELETE") {
    if (
      !req.actions?.some((item: any) => item.code === "admin:action:delete")
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    const { id } = req.query;
    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Internal server" });
    }

    try {
      const deleteAction = await prisma.action.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json(deleteAction);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "GET") {
    if (!req.actions?.some((item: any) => item.code === "admin:action:read")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    try {
      const actions = await prisma.action.findMany();
      return res.json(actions);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default withProtected(Actions);
