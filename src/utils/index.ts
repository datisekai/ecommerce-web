import { NextApiResponse } from "next";
import INextApiRequest from "../models/NextApiRequest";

export const formatPrices = (price: number) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const createAvatar = (name: string) => {
  console.log(name)
  return   `https://ui-avatars.com/api/?name=${name}`;
}

var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export function formatPrices1(number: number) {
  // what tier? (determines SI symbol)
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier == 0) return number;

  // get suffix and determine scale
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);

  // scale the number
  var scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(1) + suffix;
}
