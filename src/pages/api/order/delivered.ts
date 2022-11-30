import { NextApiResponse } from "next";
import isLogin from "../../../../middlewares/isLogin";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import missing from "../../../utils/missing";
import notAuthorized from "../../../utils/notAuthorized";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { orderId } = req.query;
    if (!orderId) {
      return missing(res);
    }

    try {
      const currentOrder = await prisma.order.findFirst({
        where: {
          id: Number(orderId),
        },
      });

      if (!currentOrder) {
        return missing(res);
      }

      if (currentOrder.userId == req.userId) {
        const newOrder = await prisma.order.update({
          where: {
            id: Number(orderId),
          },
          data: {
            statusId: 3,
          },
        });

        return res.json(newOrder);
      }
      return notAuthorized(res);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default isLogin(handler);
