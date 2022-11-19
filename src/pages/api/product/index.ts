import { logError } from "./../../../utils/logError";
import { prisma } from "./../../../server/db/client";
import { NextApiResponse } from "next";
import withProtected from "../../../../middlewares/withProtected";

import INextApiRequest from "../../../models/NextApiRequest";
import missing from "../../../utils/missing";
import slugify from "slugify";

const product = {
  categoryId: 1,
  name: "Sản phẩm 1",
  description: "Mô tả sản phẩm 1",
  image: "https://abc",
  variants: [
    {
      name: "màu sắc",
      children: [{ name: "Xanh" }, { name: "Đỏ" }],
    },
    {
      name: "Kích thước",
      children: [
        {
          name: "S",
        },
      ],
    },
  ],
};

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.actions?.some((item: any) => item.code === "seller:product:add")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
    const { categoryId, name, description, image, variants, slug } = req.body;

    if (!categoryId || !name || !description || !image || !variants) {
      return missing(res);
    }

    try {
      const newProduct = await prisma.product.create({
        data: {
          categoryId: Number(categoryId),
          image: image as string,
          name: name as string,
          sellerId: req.userId as string,
          description: description as string,
          slug: slug ? slug : slugify(name.toLowerCase()),
        },
      });

      const newVariants = await Promise.all(
        variants.map((item: any) =>
          prisma.variant.create({
            data: {
              name: item.name,
              productId: newProduct.id,
            },
          })
        )
      );

      const variantOptions: any = [];
      newVariants.forEach((item: any, index: number) => {
        if (variants[index].children) {
          variants[index].children.forEach((element: any) => {
            variantOptions.push({ ...element, variantId: item.id });
          });
        }
      });

      const newVariantOptions = await Promise.all(
        variantOptions.map((item: any) =>
          prisma.variantOption.create({
            data: {
              name: item.name,
              variantId: item.variantId,
              productId: newProduct.id,
            },
          })
        )
      );

      return res.json({
        product: newProduct,
        variants: newVariants,
        variantOptions: newVariantOptions,
      });
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "GET") {
    if (!req.actions?.some((item: any) => item.code === "seller:product:add")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    const { productId } = req.query;
    if (!productId) {
      return missing(res);
    }
    try {
      const variantOptions = await prisma.variantOption.findMany({
        where: {
          productId: Number(productId),
        },
        include: {
          variant: true,
        },
      });

      const variants: any = [];

      variantOptions.forEach((item: any) => {
        const isExist = variants.some(
          (element: any) => element.id === item.variantId
        );
        if (!isExist) {
          variants.push(item.variant);
        }
      });

      const options = [variantOptions[0]];
      console.log(options[0]);
      const otherOptions: any = [];
      variantOptions.forEach((item: any, index) => {
        if (index > 0) {
          if (item.variantId === options[0]?.variantId) {
            options.push(item);
          } else {
            otherOptions.push(item);
          }
        }
      });

      const data: any = [];

      options.forEach((item: any) => {
        otherOptions.forEach((item1: any) => {
          data.push([item, item1]);
        });
      });

      return res.json({ options, otherOptions, data });
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default withProtected(handler);
