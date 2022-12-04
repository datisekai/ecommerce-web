import { ProductModel, Products } from "./../models/product.model";
import axiosClient from "../config/axiosClient";
import { ProductDetail } from "../models/product.model";
import { Product, Sku } from "../models/SkuSeller.model";

type ProductApiProps = {
  home: (page?: number) => Promise<ProductModel[]>;
  detail: (slug: string) => Promise<ProductDetail>;
  shop: (sellerId: string, page?: number) => Promise<Products>;
  addProduct: (data: any) => Promise<any>;
  getSkus: (type: string) => Promise<Sku[]>;
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
  shop: async (sellerId: string, page = 1) => {
    const result = await axiosClient("/product/view", {
      params: {
        limit: 12,
        page,
        sellerId,
      },
    });
    return result.data;
  },
  addProduct: async (data) => {
    const result = await axiosClient.post("/product/create", data);
    return result.data;
  },
  getSkus: async (type = "1") => {
    const result = await axiosClient.get(`/sku?type=${type}`);
    return result.data;
  },
};

export default ProductApi;
