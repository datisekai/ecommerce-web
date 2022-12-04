import { NextApiResponse } from "next";
import axiosUpload from "../config/axiosUpload";
import INextApiRequest from "../models/NextApiRequest";

export const formatPrices = (price: number) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const createAvatar = (name: string) => {
  console.log(name);
  return `https://ui-avatars.com/api/?name=${name}`;
};

const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export function formatPrices1(number: number) {
  // what tier? (determines SI symbol)
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier == 0) return number;

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  // scale the number
  const scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(1) + suffix;
}

export const uploadImg = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

  try {
    const res = await axiosUpload.post("/", formData);
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};
