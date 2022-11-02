import { logError } from "./../../../utils/logError";
import { NextApiResponse } from "next";
import withProtected from "../../../../middlewares/withProtected";
import INextApiRequest from "../../../models/NextApiRequest";
import missing from "../../../utils/missing";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (
      !req.actions?.some((item: any) => item.code === "seller:category:add")
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    const { categoryId, products } = req.body;
    if (!categoryId || !products) {
      return missing(res);
    }

    try {
      const newProducts = await Promise.all(
        products.map((item: any) =>
          prisma?.categoryProduct.create({
            data: {
              categoryId: categoryId,
              productId: item,
            },
          })
        )
      );
      return res.json(newProducts);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "GET") {
    const { categoryId } = req.query;
    if (!categoryId) {
      return missing(res);
    }

    try {
      const products = await prisma?.categoryProduct.findMany({
        where: {
          categoryId: Number(categoryId),
        },
        include: {
          products: true,
        },
      });
      return res.json(products);
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default withProtected(handler);
