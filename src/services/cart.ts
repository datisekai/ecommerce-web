import axiosClient from "../config/axiosClient";
import { Cart, CartDetail } from "../models/cart.model";

export type DataAddCart = {
  skuId: number;
  qty: number;
  sellerId: string;
};

export type DataUpdateCart = {
  cartDetailId: number;
  qty: number;
};

export type DataDeleteCart = {
  cartDetailId: number;
  sellerId: string;
};

type CartApiProps = {
  addToCart: (data: DataAddCart) => Promise<CartDetail>;
  view: () => Promise<Cart[]>;
  updateToCart: (data: DataUpdateCart) => Promise<CartDetail>;
  deleteToCart: (data: DataDeleteCart) => Promise<CartDetail>;
};

const CartApi: CartApiProps = {
  addToCart: async (data: DataAddCart) => {
    const result = await axiosClient.post("/cart", data);
    return result.data;
  },
  view: async () => {
    const result = await axiosClient.get("/cart");
    return result.data;
  },
  updateToCart: async (data: DataUpdateCart) => {
    const result = await axiosClient.put("/cart", data);
    return result.data;
  },
  deleteToCart: async (data: DataDeleteCart) => {
    const result = await axiosClient.delete("/cart", {
      params: data,
    });
    return result.data;
  },
};

export default CartApi;
