import { logError } from "./../../../utils/logError";
import { NextApiResponse } from "next";
import INextApiRequest from "../../../models/NextApiRequest";
import { prisma } from "../../../server/db/client";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  let data: any = req.query;
  const { page = 1, limit = 12 } = data;
  const skip = (+page - 1) * +limit;
  if (data.name) {
    data.name = {
      contains: data.name,
    };
  }

  if (data.categoryId) {
    data.categoryId = +data.categoryId;
  }

  if (req.method === "GET") {
    try {
      const products = await prisma?.product.findMany({
        where: {
          ...data,
        },
        take: +limit,
        skip,
        include: {
          skus: true,
        },
      });
      const productsReturn = products?.map((item: any) => {
        let maxPrice = item.skus[0].price * (item.skus[0].discount / 100);
        let minPrice = item.skus[0].price * (item.skus[0].discount / 100);
        item.skus.forEach((element: any) => {
          if (element.price > maxPrice) {
            maxPrice = element.price * (element.discount / 100);
          }
          if (element.price < minPrice) {
            minPrice = element.price * (element.discount / 100);
          }
        });
        return {
          ...item,
          skus: undefined,
          minPrice,
          maxPrice,
        };
      });
      return res.json(productsReturn);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default handler;
