import { logError } from "./../../../utils/logError";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import INextApiRequest from "../../../models/NextApiRequest";
import { prisma } from "../../../server/db/client";
import withProtected from "../../../../middlewares/withProtected";
const Users = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    if (!req.actions?.some((item: any) => item.code === "admin:user:read")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    try {
      const users = await prisma?.user.findMany({
        include: {
          permission: true,
        },
      });
      return res.json(users);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default withProtected(Users);
