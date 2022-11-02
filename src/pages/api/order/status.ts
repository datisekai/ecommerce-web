import { NextApiResponse } from "next";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import missing from "../../../utils/missing";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const statuses = await prisma?.status.findMany();

      return res.json(statuses);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "POST") {
    const { name } = req.body;
    if (!name) {
      return missing(res);
    }

    try {
      const newStatus = await prisma?.status.create({
        data: {
          name,
        },
      });
      return res.json(newStatus);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "DELETE") {
    const commentId = req.query;
    if (!commentId) {
      return missing(res);
    }

    try {
      const deleteStatus = await prisma?.status.delete({
        where: {
          id: Number(commentId),
        },
      });
      return res.json(deleteStatus);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default handler;
