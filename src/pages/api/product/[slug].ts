import { NextApiResponse } from "next";
import withProtected from "../../../../middlewares/withProtected";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import missing from "../../../utils/missing";
import notAuthorized from "../../../utils/notAuthorized";
import { prisma } from "../../../server/db/client";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  const { slug, permission } = req.query;

  if (!slug || !permission) {
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

      try {
        const data = req.body;
        const updateProduct = await prisma?.product.update({
          where: {
            slug: slug as string,
          },
          data: data,
        });
        return res.json(updateProduct);
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

      try {
        const data = req.body;
        const currentProduct = await prisma?.product.findFirst({
          where: {
            slug: slug as string,
          },
        });
        if (currentProduct && currentProduct.sellerId === req.userId) {
          const updateProduct = await prisma?.product.update({
            where: {
              slug: slug as string,
            },
            data: data,
          });
          return res.json(updateProduct);
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
        !req.actions?.some((item: any) => item.code === "admin:product:update")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }

      try {
        const deleteProduct = await prisma?.product.delete({
          where: {
            slug: slug as string,
          },
        });

        return res.json(deleteProduct);
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

      try {
        const currentProduct = await prisma?.product.findFirst({
          where: {
            slug: slug as string,
          },
        });
        if (currentProduct && currentProduct.sellerId === req.userId) {
          const deleteProduct = await prisma?.product.delete({
            where: {
              slug: slug as string,
            },
          });

          return res.json(deleteProduct);
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
