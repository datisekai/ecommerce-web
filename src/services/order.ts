import axiosClient from "../config/axiosClient";
import { Sku } from "../models/cart.model";
import { Order, OrderReponse } from "../models/order.model";

type DataCreate = {
  skus: any;
  cartId: string | number;
  description?: string;
};

type OrderApiProps = {
  create: (data: DataCreate) => Promise<OrderReponse>;
  getOrder: (type: number | string, token: string) => Promise<Order[]>;
  delivered: (orderId: number | string) => Promise<Order>;
};

const OrderApi: OrderApiProps = {
  create: async (data) => {
    const result = await axiosClient.post("/order/create", {
      skus: data.skus,
      cartId: data.cartId,
      description: data.description,
    });
    return result.data;
  },
  getOrder: async (type, token) => {
    const result = await axiosClient.get(`/order?statusId=${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  },
  delivered: async (orderId) => {
    const result = await axiosClient.get(`/order/delivered?orderId=${orderId}`);
    return result.data;
  },
};

export default OrderApi;
