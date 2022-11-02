import { NextApiResponse } from "next";
const notAuthorized = (res: NextApiResponse) => {
  return res.status(401).json({ success: false, message: "Not authorized" });
};
export default notAuthorized;
