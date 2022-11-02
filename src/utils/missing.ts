import { NextApiResponse } from "next";
const missing = (res: NextApiResponse) => {
  return res.status(404).json({ success: false, message: "Missing" });
};
export default missing;
