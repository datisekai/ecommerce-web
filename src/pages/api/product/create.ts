import { NextApiResponse } from "next";
import withProtected from "../../../../middlewares/withProtected";
import INextApiRequest from "../../../models/NextApiRequest";

const product = {
  categoryId: 1,
  name: "Sản phẩm 1",
  description: "Mô tả sản phẩm 1",
  image: "https://cf.shopee.vn/file/7750ae1d3a4b4ba05da615d168887f22_tn",
  variants: [
    {
      name: "Màu sắc",
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

  skuValue: [
    {
      variantOptions: [
        {
          name: "Xanh",
          variantName: "Màu sắc",
        },
        {
          name: "S",
          variantName: "Kích thước",
        },
      ],
      quantity: 90,
      price: 200000,
      discount: 50,
      image: "https://cf.shopee.vn/file/7750ae1d3a4b4ba05da615d168887f22_tn",
    },
    {
      variantOptions: [
        {
          name: "Xanh",
          variantName: "Màu sắc",
        },
        {
          name: "S",
          variantName: "Kích thước",
        },
      ],
      quantity: 90,
      price: 200000,
      discount: 50,
      image: "https://cf.shopee.vn/file/7750ae1d3a4b4ba05da615d168887f22_tn",
    },
  ],
};

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
  }
};

export default withProtected(handler);
