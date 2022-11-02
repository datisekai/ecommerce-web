import { logError } from "./../../../utils/logError";
import { NextApiResponse } from "next";
import isLogin from "../../../../middlewares/isLogin";
import INextApiRequest from "../../../models/NextApiRequest";
import missing from "../../../utils/missing";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { voucherId } = req.query;
    if (!voucherId) {
      return missing(res);
    }

    try {
      const newVoucherUser = await prisma?.voucherUser.create({
        data: {
          userId: req.userId as string,
          voucherId: Number(voucherId),
        },
      });

      return res.json(newVoucherUser);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default isLogin(handler);
