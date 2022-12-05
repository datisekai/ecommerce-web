import { NextApiResponse } from "next";
import withProtected from "../../../middlewares/withProtected";
import INextApiRequest from "../../models/NextApiRequest";
import { logError } from "../../utils/logError";
import missing from "../../utils/missing";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    if (
      !req.actions?.some((item: any) => item.code === "admin:privilege:update")
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    try {
      const { perId } = req.query;
      const { data } = req.body;
      if (!perId || !data) {
        return missing(res);
      }

      await prisma.action.deleteMany({
        where: {
          perId: Number(perId),
        },
      });

      const newActions = await Promise.all(
        data.map((item: any) =>
          prisma.action.create({
            data: {
              code: item.code,
              perListId: item.perListId,
              perId: Number(perId),
            },
            include: {
              perList: true,
              privilege: true,
            },
          })
        )
      );
      return res.json(newActions);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default withProtected(handler);
