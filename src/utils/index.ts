import { NextApiResponse } from "next";
import INextApiRequest from "../models/NextApiRequest";

export const formatPrices = (price: number) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const createAvatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${name}`;
