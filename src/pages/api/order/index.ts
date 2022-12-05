import { NextApiResponse } from "next";
import isLogin from "../../../../middlewares/isLogin";
import INextApiRequest from "../../../models/NextApiRequest";
import { prisma } from "../../../server/db/client";
import { logError } from "../../../utils/logError";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { statusId } = req.query;

    const data: any = { userId: req.userId };

    if (statusId && Number(statusId) != 0) {
      data.statusId = Number(statusId);
    }

    try {
      const orderList = await prisma.order.findMany({
        where: {
          ...data,
        },
        include: {
          status: true,
          orderDetails: {
            include: {
              sku: {
                include: {
                  product: true,
                  skuValues: {
                    include: {
                      variant: true,
                      variantOption: true,
                    },
                  },
                },
              },
            },
          },
          seller: {
            select: {
              id: true,
              name: true,
              email: true,
              nameShop: true,
              date: true,
              image: true,
              createdAt: true,
            },
          },
          orderReports: {
            include: {
              orderReportImages: true,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      });
      return res.json(orderList);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default isLogin(handler);
