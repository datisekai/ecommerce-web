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
              createdAt:true
            },
           
          },
  
          variants: {
            include: {
              variantOptions: true,
            },
          },
          skuValues: true,
          skus: true,
          variantOptions: true,
          comments:{
            include:{
              user:{
                select:{
                  phone:true,
                  id:true,
                  image:true,
                  email:true,
                  name:true
                }
              },
              commentImages:true
            }
          }
        },
      });


      const qtys = await Promise.all([prisma.orderDetail.count({
        where: {
          skuId: {
            in: currentProduct?.skus.map((item: any) => item.id),
          },
        },
      }), prisma.product.count({
        where:{
          sellerId:currentProduct.sellerId
        }
      })])

      const currentStar = (( currentProduct.comments.reduce((total:any, current:any) => {
        return total + current.pointStar
      },0))/currentProduct.comments.length) || 0


      
      return res.json({ ...currentProduct, qtySold:qtys[0], seller:{...currentProduct.seller, qty:qtys[1]}, currentStar });
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default handler;
