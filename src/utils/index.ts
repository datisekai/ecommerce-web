import { NextApiResponse } from "next";
import INextApiRequest from "../models/NextApiRequest";

export const formatPrices = (price: number) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
