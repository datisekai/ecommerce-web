import { NextApiResponse } from "next";
import withProtected from "../../../../middlewares/withProtected";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import missing from "../../../utils/missing";
import { prisma } from "../../../server/db/client";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      let categories: any = [];
      if (!id) {
        categories = await prisma?.category.findMany({
          where: {
            sellerId: null,
          },
        });
      } else {
        categories = await prisma?.category.findMany({
          where: {
            sellerId: id.toString(),
          },
        });
        
        
      }
      const qtys = await Promise.all(categories.map((item:any) => prisma.product.count({
        where:{
          categoryId:item.id
        }
      })))
      const categoryReturn = categories.map((item:any,index:number) => ({
        ...item, count:qtys[index]
      }))
      return res.json(categoryReturn);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default handler;
