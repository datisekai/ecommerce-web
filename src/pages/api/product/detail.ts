import { logError } from "./../../../utils/logError";
import { NextApiResponse } from "next";
import INextApiRequest from "../../../models/NextApiRequest";
import missing from "../../../utils/missing";
import { prisma } from "../../../server/db/client";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { slug } = req.query;
    if (!slug) {
      return missing(res);
    }

    try {
      const currentProduct = await prisma?.product.findUnique({
        where: {
          slug: slug as string,
        },
        include: {
          seller: {
            select: {
              id: true,
              name: true,
              email: true,
              nameShop: true,
              date: true,
              image: true,
            },
          },
          // skus: {
          //   include: {
          //     skuValues: {
          //       include: {
          //         variant: true,
          //         variantOption: true,
          //       },
          //     },
          //   },
          // },
          variants: {
            include: {
              variantOptions: true,
            },
          },
          skuValues: true,
          skus: true,
          variantOptions: true,
        },
      });

      const qtySold = await prisma.orderDetail.count({
        where: {
          skuId: {
            in: currentProduct?.skus.map((item: any) => item.id),
          },
        },
      });
      return res.json({ ...currentProduct, qtySold });
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default handler;
