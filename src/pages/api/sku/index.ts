import { NextApiResponse } from "next";
import withProtected from "../../../../middlewares/withProtected";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import notAuthorized from "../../../utils/notAuthorized";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { type = "1" } = req.query;
    if (req.perId != 2) {
      return notAuthorized(res);
    }

    try {
      const data: any = {
        product: {
          sellerId: req.userId,
        },
      };

      if (Number(type) == 2) {
        data.qty = {
          gt: 0,
        };
      }

      if (Number(type) == 3) {
        data.qty = 0;
      }

      const listSkus = await prisma.sku.findMany({
        where: {
          ...data,
        },
        include: {
          product: true,
          skuValues: {
            include: {
              variant: true,
              variantOption: true,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      });

      return res.json(listSkus);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default withProtected(handler);
