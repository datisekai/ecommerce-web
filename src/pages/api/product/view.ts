import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { logError } from "../../../utils/logError";
import { prisma } from "../../../server/db/client";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { page = 1, limit = 12, sellerId } = req.query;

    const skip = (+page - 1) * +limit;

    try {
      const products = await prisma?.product.findMany({
        include: {
          skus: true,
        },
        take: +limit,
        skip,
        orderBy: {
          createdAt: "desc",
        },
      });

      const counts = await prisma.product.count();

      const qtys = await Promise.all(
        products.map((item: any) => {
          return prisma.orderDetail.count({
            where: {
              skuId: {
                in: item.skus.map((element: any) => element.id),
              },
            },
          });
        })
      );

      const productsReturn = products?.map((item: any, index: number) => {
        let maxPrice =
          item.skus[0].price * ((100 - item.skus[0].discount) / 100);
        let minPrice =
          item.skus[0].price * ((100 - item.skus[0].discount) / 100);
        item.skus.forEach((element: any) => {
          if (element.price > maxPrice) {
            maxPrice = element.price * ((100 - element.discount) / 100);
          }
          if (element.price < minPrice) {
            minPrice = element.price * ((100 - element.discount) / 100);
          }
        });
        return {
          ...item,
          skus: undefined,
          minPrice,
          maxPrice,
          qtySold: qtys[index],
        };
      });

      return res.json({
        products: productsReturn,
        totalPage: Math.ceil(counts / +limit),
      });
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default handler;
