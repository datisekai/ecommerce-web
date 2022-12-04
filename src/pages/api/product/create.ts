import { NextApiResponse } from "next";
import slugify from "slugify";
import withProtected from "../../../../middlewares/withProtected";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import notAuthorized from "../../../utils/notAuthorized";

const product = {
  categoryId: 1,
  sellerId: "cl9uz6mbg00027k2k2m8m5azm",
  name: "Quần ống rộng jogger unisex, quần jogger trơn chất nỉ ngoại kiểu dáng thể thao năng động",
  description:
    "Quần ống rộng jogger unisex, quần boom trơn chất nỉ ngoại kiểu dáng thể thao năng động",
  image: "https://cf.shopee.vn/file/18a5abc31786136dd6dbe77e2aa7d994",
  variants: [
    {
      id: "44918100-4393-4f9e-91b6-5a536f030546",
      name: "Màu sắc",
    },
    {
      id: "163f21c2-7229-11ed-a1eb-0242ac120002",
      name: "Kích thước",
    },
  ],

  skuValue: [
    {
      variantOptions: [
        {
          name: "Đen",
          variantId: "44918100-4393-4f9e-91b6-5a536f030546",
        },
        {
          name: "S",
          variantId: "163f21c2-7229-11ed-a1eb-0242ac120002",
        },
      ],
      quantity: 434,
      price: 110000,
      discount: 32,
      image: "https://cf.shopee.vn/file/1560b10df325e3d033b398824bf41e01",
    },
    {
      variantOptions: [
        {
          name: "Đen",
          variantId: "44918100-4393-4f9e-91b6-5a536f030546",
        },
        {
          name: "M",
          variantId: "163f21c2-7229-11ed-a1eb-0242ac120002",
        },
      ],
      quantity: 433,
      price: 110000,
      discount: 32,
      image: "https://cf.shopee.vn/file/1560b10df325e3d033b398824bf41e01",
    },
    {
      variantOptions: [
        {
          name: "Xám",
          variantId: "44918100-4393-4f9e-91b6-5a536f030546",
        },
        {
          name: "S",
          variantId: "163f21c2-7229-11ed-a1eb-0242ac120002",
        },
      ],
      quantity: 773,
      price: 110000,
      discount: 32,
      image: "https://cf.shopee.vn/file/9743fb67ff6d1556cca66aa876949299",
    },
    {
      variantOptions: [
        {
          name: "Xám",
          variantId: "44918100-4393-4f9e-91b6-5a536f030546",
        },
        {
          name: "M",
          variantId: "163f21c2-7229-11ed-a1eb-0242ac120002",
        },
      ],
      quantity: 772,
      price: 110000,
      discount: 32,
      image: "https://cf.shopee.vn/file/9743fb67ff6d1556cca66aa876949299",
    },
    {
      variantOptions: [
        {
          name: "Xanh Than",
          variantId: "44918100-4393-4f9e-91b6-5a536f030546",
        },
        {
          name: "S",
          variantId: "163f21c2-7229-11ed-a1eb-0242ac120002",
        },
      ],
      quantity: 979,
      price: 110000,
      discount: 37,
      image: "https://cf.shopee.vn/file/7246539d6694dd9117b1372ce2864bf2",
    },
    {
      variantOptions: [
        {
          name: "Xanh Than",
          variantId: "44918100-4393-4f9e-91b6-5a536f030546",
        },
        {
          name: "M",
          variantId: "163f21c2-7229-11ed-a1eb-0242ac120002",
        },
      ],
      quantity: 978,
      price: 110000,
      discount: 37,
      image: "https://cf.shopee.vn/file/7246539d6694dd9117b1372ce2864bf2",
    },
  ],
};

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (req.perId != 2) {
      console.log("not authorize");
      return notAuthorized(res);
    }
    const currentProduct: any = req.body;
    try {
      const newProduct = await prisma.product.create({
        data: {
          image: currentProduct.image,
          name: currentProduct.name,
          slug: slugify(currentProduct.name.toLowerCase()),
          categoryId: currentProduct.categoryId,
          description: currentProduct.description,
          sellerId: req.userId,
        },
      });

      currentProduct.id = newProduct.id;

      const newVariants = await Promise.all(
        currentProduct.variants.map((item: any) =>
          prisma.variant.create({
            data: {
              name: item.name,
              productId: newProduct.id,
            },
          })
        )
      );

      currentProduct.variants = currentProduct.variants.map(
        (item: any, index: number) => ({
          ...item,
          dataId: newVariants[index].id,
        })
      );

      const newSkus = await Promise.all(
        currentProduct.skuValue.map((item) =>
          prisma.sku.create({
            data: {
              image: item.image,
              price: item.price,
              discount: item.discount,
              productId: newProduct.id,
              qty: item.quantity,
            },
          })
        )
      );

      currentProduct.skuValue = currentProduct.skuValue.map(
        (item: any, index: number) => {
          const newVariantOptions = item.variantOptions.map((element: any) => {
            const currentVariant = currentProduct.variants.find(
              (variant: any) => variant.id === element.variantId
            );
            return {
              ...element,
              dataVariantId: currentVariant.dataId,
              skuId: newSkus[index].id,
            };
          });

          return {
            ...item,
            id: newSkus[index].id,
            variantOptions: newVariantOptions,
          };
        }
      );

      let currentVariantOptions: any = [];
      const oldVariantOptions: any = [];
      currentProduct.skuValue.forEach((item: any) => {
        item.variantOptions.forEach((element: any) => {
          const isExist = currentVariantOptions.some(
            (check: any) =>
              check.variantId == element.variantId &&
              check.name === element.name
          );
          if (!isExist) {
            currentVariantOptions.push(element);
          }
          oldVariantOptions.push(element);
        });
      });

      const newVariantOptions = await Promise.all(
        currentVariantOptions.map((item) =>
          prisma.variantOption.create({
            data: {
              name: item.name,
              productId: newProduct.id,
              variantId: item.dataVariantId,
            },
          })
        )
      );

      currentVariantOptions = currentVariantOptions.map(
        (item: any, index: number) => ({
          ...item,
          id: newVariantOptions[index].id,
        })
      );

      oldVariantOptions.forEach((item: any) => {
        const isExist = newVariantOptions.find(
          (element: any) =>
            element.name === item.name &&
            element.variantId == item.dataVariantId
        );
        if (isExist) {
          item.id = isExist.id;
        }
      });

      currentProduct.skuValue = currentProduct.skuValue.map((item: any) => ({
        ...item,
        variantOptions: oldVariantOptions.filter(
          (element: any) => element.skuId == item.id
        ),
      }));

      let currentSkuValue = [];

      currentProduct.skuValue.forEach((item: any) => {
        currentSkuValue = [...currentSkuValue, ...item.variantOptions];
      });

      const newSkuValues = await Promise.all(
        currentSkuValue.map((item) =>
          prisma.skuValue.create({
            data: {
              productId: newProduct.id,
              skuId: item.skuId,
              variantId: item.dataVariantId,
              variantOptionId: item.id,
            },
          })
        )
      );

      return res.json({
        newProduct,
        newVariants,
        newVariantOptions,
        newSkuValues,
        oldVariantOptions,
      });
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default withProtected(handler);
