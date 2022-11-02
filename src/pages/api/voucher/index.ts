import { logError } from "./../../../utils/logError";
import { NextApiResponse } from "next";
import INextApiRequest from "../../../models/NextApiRequest";
import missing from "../../../utils/missing";
import withProtected from "../../../../middlewares/withProtected";
import notAuthorized from "../../../utils/notAuthorized";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  const { sellerId, permission } = req.query;
  if (!permission) {
    return missing(res);
  }
  if (req.method === "GET") {
    if (permission === "admin") {
      if (
        !req.actions?.some((item: any) => item.code === "admin:voucher:read")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }
      try {
        const vouchers = await prisma?.voucher.findMany();
        return res.json(vouchers);
      } catch (error) {
        return logError(res, error);
      }
    } else if (permission === "seller") {
      if (
        !req.actions?.some((item: any) => item.code === "seller:voucher:read")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }
      try {
        const vouchers = await prisma?.voucher.findMany({
          where: {
            sellerId: req.userId,
          },
        });
        return res.json(vouchers);
      } catch (error) {
        return logError(res, error);
      }
    }
    return missing(res);
  } else if (req.method === "POST") {
    const { name, discount, limitPrice, sellerId } = req.body;
    if (permission === "admin") {
      if (!name || !discount || !limitPrice) {
        return missing(res);
      }
      try {
        const newVoucher = await prisma?.voucher.create({
          data: {
            name,
            discount: Number(discount),
            limitPrice: limitPrice,
          },
        });
        return res.json(newVoucher);
      } catch (error) {
        return logError(res, error);
      }
    } else if (permission === "seller") {
      if (!name || !discount || !limitPrice || !sellerId) {
        return missing(res);
      }
      try {
        const newVoucher = await prisma?.voucher.create({
          data: {
            name,
            discount: Number(discount),
            limitPrice: Number(limitPrice),
            sellerId: sellerId,
          },
        });
        return res.json(newVoucher);
      } catch (error) {
        return logError(res, error);
      }
    }
    return missing(res);
  } else if (req.method === "PUT") {
    const { id } = req.query;
    if (!id) {
      return missing(res);
    }
    const data = req.body;
    if (permission === "admin") {
      if (
        !req.actions?.some((item: any) => item.code === "admin:voucher:update")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }
      try {
        const voucher = await prisma?.voucher.update({
          where: {
            id: Number(id),
          },
          data,
        });
        return res.json(voucher);
      } catch (error) {
        return logError(res, error);
      }
    } else if (permission === "seller") {
      if (
        !req.actions?.some((item: any) => item.code === "seller:voucher:update")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }
      try {
        const voucher = await prisma?.voucher.update({
          where: {
            id: Number(id),
          },
          data,
        });
        return res.json(voucher);
      } catch (error) {
        return logError(res, error);
      }
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) {
      return missing(res);
    }
    if (permission === "admin") {
      if (
        !req.actions?.some((item: any) => item.code === "admin:voucher:delete")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }
      try {
        const deleteVoucher = await prisma?.voucher.delete({
          where: {
            id: Number(id),
          },
        });
        return res.json(deleteVoucher);
      } catch (error) {
        return logError(res, error);
      }
    } else if (permission === "seller") {
      if (
        !req.actions?.some((item: any) => item.code === "seller:voucher:delete")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }
      try {
        const currentVoucher = await prisma?.voucher.findFirst({
          where: {
            id: Number(id),
          },
        });

        if (currentVoucher?.sellerId === req.userId) {
          const deleteVoucher = await prisma?.voucher.delete({
            where: {
              id: Number(id),
            },
          });
          return res.json(deleteVoucher);
        }
        return notAuthorized(res);
      } catch (error) {
        return logError(res, error);
      }
    }
  }
};

export default withProtected(handler);
