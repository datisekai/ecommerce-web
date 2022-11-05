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

    console.log(slug);
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
        },
      });
      return res.json(currentProduct);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default handler;
