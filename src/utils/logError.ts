import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import INextApiRequest from "../models/NextApiRequest";
export const logError = (res: NextApiResponse, error: any) => {
  console.log(error);
  return res.status(500).json({ success: false, message: "Internal server" });
};
