import { NextApiResponse } from "next";
import isLogin from "../../../../middlewares/isLogin";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import missing from "../../../utils/missing";
import notAuthorized from "../../../utils/notAuthorized";
import { prisma } from "../../../server/db/client";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const myCarts = await prisma?.cart.findMany({
        where: {
          userId: req.userId,
        },
        include: {
          cartDetails: {
            include: {
              sku: {
                include: {
                  product: true,
                  skuValues:{
                    include:{
                      variant:true,
                      variantOption:true
                    }
                  }
                },
              },
            },
          },
          seller: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              nameShop: true,
              gender: true,
              createdAt: true,
              date: true,
              image: true,
            },
          },
        },
      });

      return res.json(myCarts);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "POST") {
    const { skuId, qty, sellerId } = req.body;
    if (!skuId || !qty || !sellerId) {
      return missing(res);
    }

    try {
      const currentCart = await prisma?.cart.findFirst({
        where: {
          userId: req.userId,
          sellerId,
        },
      });
      if (!currentCart) {
        const myCart = await prisma?.cart.create({
          data: {
            sellerId,
            userId: req.userId as string,
          },
        });

        if (myCart && myCart.userId !== req.userId) {
          return notAuthorized(res);
        }

        const newCartDetail = await prisma?.cartDetail.create({
          data: {
            cartId: myCart.id,
            skuId: Number(skuId),
            qty: Number(qty),
          },
          include: {
            sku: {
              include: {
                product: true,
                skuValues:{
                  include:{
                    variant:true,
                    variantOption:true
                  }
                }
              },
            },
          },
        });

        return res.json(newCartDetail);
      } else {
        const currentSku = await prisma?.cartDetail.findFirst({
          where: {
            skuId: Number(skuId),
            cartId: currentCart.id,
          },
        });
        if (!currentSku) {
          const newCartSku = await prisma?.cartDetail.create({
            data: {
              cartId: currentCart.id,
              skuId: Number(skuId),
              qty: Number(qty),
            },
            include: {
              sku: {
                include: {
                  product: true,
                  skuValues:{
                    include:{
                      variant:true,
                      variantOption:true
                    }
                  }
                },
              },
            },
          });
          return res.json(newCartSku);
        } else {
          const updateSku = await prisma?.cartDetail.update({
            where: {
              id: currentSku.id,
            },
            data: {
              qty: currentSku.qty + Number(qty),
            },
            include: {
              sku: {
                include: {
                  product: true,
                  skuValues:{
                    include:{
                      variant:true,
                      variantOption:true
                    }
                  }
                },
              },
            },
          });
          return res.json(updateSku);
        }
      }
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "DELETE") {
    const { cartDetailId, sellerId } = req.query;
    if (!cartDetailId || !sellerId) {
      return missing(res);
    }
    try {
      const currentCart = await prisma?.cart.findFirst({
        where: {
          sellerId: sellerId as string,
          userId: req.userId,
        },
        include: {
          cartDetails: true,
        },
      });
      if (currentCart) {
        const deleteSku = await prisma?.cartDetail.delete({
          where: {
            id: Number(cartDetailId),
          },
        });

        if (currentCart.cartDetails.length <= 1) {
          await prisma?.cart.delete({
            where: {
              id: Number(currentCart.id),
            },
          });
        }

        return res.json(deleteSku);
      }
      return notAuthorized(res);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "PUT") {
    const { cartDetailId, sellerId, qty } = req.body;

    if (!cartDetailId || !qty) {
      return missing(res);
    }

    try {
      const currentCart = await prisma?.cartDetail.findFirst({
        where: {
          id: Number(cartDetailId),
        },
        include: {
          cart: true,
        },
      });

      if (currentCart?.cart.userId === req.userId) {
        const updateCart = await prisma?.cartDetail.update({
          where: {
            id: Number(cartDetailId),
          },
          data: {
            qty: Number(qty),
          },
        });
        return res.json(updateCart);
      }

      return notAuthorized(res);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default isLogin(handler);
