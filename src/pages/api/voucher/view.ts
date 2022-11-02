import { logError } from "./../../../utils/logError";
import { NextApiResponse } from "next";
import isLogin from "../../../../middlewares/isLogin";
import INextApiRequest from "../../../models/NextApiRequest";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const myVouchers = await prisma?.voucherUser.findMany({
        where: {
          userId: req.userId,
        },
      });
      return res.json(myVouchers);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default isLogin(handler);
