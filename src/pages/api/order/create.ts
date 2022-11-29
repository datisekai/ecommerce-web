import { logError } from "./../../../utils/logError";
import { NextApiResponse } from "next";
import isLogin from "../../../../middlewares/isLogin";
import INextApiRequest from "../../../models/NextApiRequest";
import missing from "../../../utils/missing";
import { prisma } from "../../../server/db/client";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { skus, cartId, description } = req.body;
    if (!skus || !cartId) {
      return missing(res);
    }

    const feeTransport = 20000;

    try {
      const total = skus.reduce(
        (pre: any, cur: any) =>
          pre + (cur.qty * cur.price * (100 - cur.discount)) / 100,
        0
      );

      const currentCart = await prisma.cart.findFirst({
        where: {
          id: Number(cartId),
        },
      });

      const newOrder = await prisma?.order.create({
        data: {
          sellerId: currentCart.sellerId,
          userId: req.userId as string,
          total: total + feeTransport,
          isPay: false,
          statusId: 1,
          description,
        },
      });

      if (newOrder) {
        const newOrderDetail = await Promise.all(
          skus.map((item: any) =>
            prisma?.orderDetail.create({
              data: {
                price: item.price,
                qty: item.qty,
                discount: item.discount,
                orderId: newOrder.id,
                skuId: item.id,
              },
            })
          )
        );
        return res.json({ order: newOrder, orderDetail: newOrderDetail });
      }
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default isLogin(handler);
