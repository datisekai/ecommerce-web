import { DefaultSession } from "next-auth";
import { NextApiResponse } from "next";
import INextApiRequest from "../../../models/NextApiRequest";
import withProtected from "../../../../middlewares/withProtected";
import { logError } from "../../../utils/logError";
import missing from "../../../utils/missing";
import notAuthorized from "../../../utils/notAuthorized";
import { prisma } from "../../../server/db/client";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.actions?.some((item: any) => item.code === "seller:product:add")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    /*

{
    productId:1,
    skuValues: [
        {
            price:1000,
            qty:20,
            discount:20,
            image:"https://abc",
            values:[
                    {
                        "id": 1,
                        "name": "Đỏ",
                        "variantId": 1,
                        "productId": 1,
                        "variant": {
                        "id": 1,
                        "name": "màu sắc",
                        "productId": 1
                        }
                    },
                    {
                        "id": 2,
                        "name": "S",
                        "variantId": 2,
                        "productId": 1,
                        "variant": {
                        "id": 2,
                        "name": "Kích thước",
                        "productId": 1
                        }
                    }
                ],
        },
      
    ]
}

*/

    try {
      const { slug, skuValues } = req.body;

      if (!slug || !skuValues) {
        return missing(res);
      }

      const currentProduct = await prisma?.product.findFirst({
        where: {
          slug: slug as string,
        },
      });

      if (currentProduct?.sellerId !== req.userId) {
        return notAuthorized(res);
      }

      if (!currentProduct) {
        return missing(res);
      }

      const newSkus = await Promise.all(
        skuValues.map((item: any) =>
          prisma?.sku.create({
            data: {
              price: item.price,
              qty: item.qty,
              discount: item.discount,
              image: item.image,
              productId: currentProduct.id,
            },
          })
        )
      );

      const dataSkuValues: any = [];

      newSkus.forEach((item: any, index: number) => {
        skuValues[index].values.forEach((element: any) => {
          dataSkuValues.push({
            productId: currentProduct?.id,
            variantId: element.variantId,
            variantOptionId: element.id,
            skuId: item.id,
          });
        });
      });

      const newSkuValues = await prisma?.skuValue.createMany({
        data: dataSkuValues,
      });

      return res.json({ success: true });
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default withProtected(handler);
