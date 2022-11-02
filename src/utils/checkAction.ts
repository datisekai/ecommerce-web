import { NextApiResponse } from "next";
import INextApiRequest from "../models/NextApiRequest";

const checkAction = (
  req: INextApiRequest,
  res: NextApiResponse,
  code: string
) => {
  if (!req.actions?.some((item: any) => item.code === code)) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }
};

export default checkAction;
