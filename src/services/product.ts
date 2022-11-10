import axiosClient from "../config/axiosClient";
import { ProductDetail, ProductModel } from "../models/product.model";

type ProductApiProps = {
  home: (page?: number) => Promise<ProductModel[]>;
  detail: (slug: string) => Promise<ProductDetail>;
};

const ProductApi: ProductApiProps = {
  home: async (page = 1) => {
    const result = await axiosClient.get(`/product/view?limit=12&page=${page}`);
    return result.data;
  },
  detail: async (slug: string) => {
    const result = await axiosClient.get(`/product/detail?slug=${slug}`);
    return result.data;
  },
};

export default ProductApi;
