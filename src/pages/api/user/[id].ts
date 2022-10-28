import { NextApiResponse } from "next";
import withProtected from "../../../../middlewares/withProtected";
import INextApiRequest from "../../../models/NextApiRequest";
const User = async (req: INextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: "Missing id" });
  }
  if (req.method === "GET") {
    if (!req.actions?.some((item: any) => item.code === "admin:user:read")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
    try {
      const currentUser = await prisma?.user.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          permission: true,
          contacts: true,
        },
      });

      if (currentUser) {
        const actions = await prisma?.action.findMany({
          where: {
            perId: currentUser.perId,
          },
        });
        return res
          .status(200)
          .json({ ...currentUser, password: undefined, actions });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User is not found" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  } else if (req.method === "PUT") {
    if (!req.actions?.some((item: any) => item.code === "admin:user:update")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
    const data = req.body;

    try {
      const currentUser = await prisma?.user.update({
        where: {
          id: Number(id),
        },
        data,
      });
      if (currentUser) {
        return res.status(200).json({ ...currentUser, password: undefined });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User is not found" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  } else if (req.method === "DELETE") {
    if (!req.actions?.some((item: any) => item.code === "admin:user:delete")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
    try {
      const currentUser = await prisma?.user.delete({
        where: {
          id: Number(id),
        },
      });

      if (currentUser) {
        return res.status(200).json({ ...currentUser, password: undefined });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User is not found" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  }
};

export default withProtected(User);
