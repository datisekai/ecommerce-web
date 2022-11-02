import { NextApiResponse } from "next";
import withProtected from "../../../../middlewares/withProtected";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import missing from "../../../utils/missing";
import notAuthorized from "../../../utils/notAuthorized";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  const { id, permission } = req.query;
  if (!permission) {
    return missing(res);
  }

  if (req.method === "POST") {
    if (permission === "admin") {
      if (
        !req.actions?.some((item: any) => item.code === "admin:category:add")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }

      const data = req.body;
      if (!data.name || !data.image) {
        return missing(res);
      }
      try {
        const newCategory = await prisma?.category.create({
          data,
        });

        return res.json(newCategory);
      } catch (error) {
        return logError(res, error);
      }
    } else if (permission === "seller") {
      if (
        !req.actions?.some((item: any) => item.code === "seller:category:add")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }
      const data = req.body;
      if (!data.name || !data.image) {
        return missing(res);
      }

      try {
        const newCategory = await prisma?.category.create({
          data: {
            image: data.image,
            name: data.name,
            parentId: data.parentId,
            sellerId: req.userId,
          },
        });

        return res.json(newCategory);
      } catch (error) {
        return logError(res, error);
      }
    } else {
      return logError(res, "Missing");
    }
  } else if (req.method === "PUT") {
    if (!id) {
      return missing(res);
    }

    const data = req.body;
    if (permission === "admin") {
      if (
        !req.actions?.some((item: any) => item.code === "admin:category:update")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }

      try {
        const newCategory = await prisma?.category.update({
          where: {
            id: Number(id),
          },
          data,
        });
        return res.json(newCategory);
      } catch (error) {
        return logError(res, error);
      }
    } else if (permission === "seller") {
      if (
        !req.actions?.some(
          (item: any) => item.code === "seller:category:update"
        )
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }
      try {
        const currentCategory = await prisma?.category.findFirst({
          where: {
            id: Number(id),
          },
        });
        if (currentCategory && currentCategory.sellerId === req.userId) {
          const newCategory = await prisma?.category.update({
            where: {
              id: Number(id),
            },
            data,
          });
          return res.json(newCategory);
        } else {
          return notAuthorized(res);
        }
      } catch (error) {
        return logError(res, error);
      }
    }
  } else if (req.method === "DELETE") {
    if (!id) {
      return missing(res);
    }
    if (permission === "admin") {
      if (
        !req.actions?.some((item: any) => item.code === "admin:category:delete")
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Not Authorized" });
      }

      try {
        const deleteCategory = await prisma?.category.delete({
          where: {
            id: Number(id),
          },
        });
        return res.json(deleteCategory);
      } catch (error) {
        return logError(res, error);
      }
    } else if (permission === "seller") {
      try {
        const currentCategory = await prisma?.category.findFirst({
          where: {
            id: Number(id),
          },
        });
        if (currentCategory && currentCategory.sellerId == req.userId) {
          const deleteCategory = await prisma?.category.delete({
            where: {
              id: Number(id),
            },
          });
          return res.json(deleteCategory);
        } else {
          return notAuthorized(res);
        }
      } catch (error) {
        return logError(res, error);
      }
    }
  }
};

export default withProtected(handler);
