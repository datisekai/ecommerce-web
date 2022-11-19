import { ProductModel, Products } from './../models/product.model';
import axiosClient from "../config/axiosClient";
import { ProductDetail } from "../models/product.model";

type ProductApiProps = {
  home: (page?: number) => Promise<ProductModel[]>;
  detail: (slug: string) => Promise<ProductDetail>;
  shop:(sellerId:string,page?:number) => Promise<Products>
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
  shop:async(sellerId:string,page = 1) => {
    const result = await axiosClient('/product/view',{params:{
      limit:12,
      page,
      sellerId
    }})
    return result.data
  }
};

export default ProductApi;
