import { NextApiResponse } from "next";
import withProtected from "../../../../middlewares/withProtected";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import missing from "../../../utils/missing";
import notAuthorized from "../../../utils/notAuthorized";
import { prisma } from "../../../server/db/client";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  const { skuId, permission } = req.query;
  if (!skuId || !permission) {
    return missing(res);
  }
  if (req.method === "PUT") {
    if (permission === "admin") {
      if (
        !req.actions?.some((item: any) => item.code === "admin:product:update")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }
      const data = req.body;
      try {
        const updateSku = await prisma?.sku.update({
          where: {
            id: Number(skuId),
          },
          data,
        });
        return res.json(updateSku);
      } catch (error) {
        return logError(res, error);
      }
    } else if (permission === "seller") {
      if (
        !req.actions?.some((item: any) => item.code === "seller:product:update")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }
      const data = req.body;
      try {
        const currentSku = await prisma?.sku.findFirst({
          where: {
            id: Number(skuId),
          },
          include: {
            product: true,
          },
        });
        if (currentSku?.product.sellerId === req.userId) {
          const updateSku = await prisma?.sku.update({
            where: {
              id: Number(skuId),
            },
            data,
          });
          return res.json(updateSku);
        } else {
          return notAuthorized(res);
        }
      } catch (error) {
        return logError(res, error);
      }
    }
  } else if (req.method === "DELETE") {
    if (permission === "admin") {
      if (
        !req.actions?.some((item: any) => item.code === "admin:product:delete")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }

      try {
        const deleteSku = await prisma?.sku.delete({
          where: {
            id: Number(skuId),
          },
        });
        return res.json(deleteSku);
      } catch (error) {
        return logError(res, error);
      }
    } else if (permission === "seller") {
      if (
        !req.actions?.some((item: any) => item.code === "seller:product:delete")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }

      try {
        const currentSku = await prisma?.sku.findFirst({
          where: {
            id: Number(skuId),
          },
          include: {
            product: true,
          },
        });
        if (currentSku?.product.sellerId === req.userId) {
          const deleteSku = await prisma?.sku.delete({
            where: {
              id: Number(skuId),
            },
          });
          return res.json(deleteSku);
        } else {
          return notAuthorized(res);
        }
      } catch (error) {
        return logError(res, error);
      }
    }
  }
};

export default withProtected(handler);
