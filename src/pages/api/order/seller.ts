import { NextApiResponse } from "next";
import withProtected from "../../../../middlewares/withProtected";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import notAuthorized from "../../../utils/notAuthorized";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.perId != 2) {
    return notAuthorized(res);
  }
  if (req.method === "GET") {
    const { statusId } = req.query;

    const data: any = {
      sellerId: req.userId,
    };

    if (Number(statusId) != 0) {
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

export default withProtected(handler);
