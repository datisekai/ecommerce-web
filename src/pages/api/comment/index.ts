import { NextApiResponse } from "next";
import isLogin from "../../../../middlewares/isLogin";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import missing from "../../../utils/missing";
import { prisma } from "../../../server/db/client";

const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { productId } = req.query;
    if (!productId) {
      return missing(res);
    }
    try {
      const comments = await prisma?.comment.findMany({
        where: {
          productId: Number(productId),
        },
      });
      return res.json(comments);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "POST") {
    const { content, pointStar, productId, images } = req.body;
    if (!content || !pointStar || !productId || !images) {
      return missing(res);
    }

    try {
      const newComment = await prisma?.comment.create({
        data: {
          content: content,
          pointStar: Number(pointStar),
          productId: Number(productId),
          userId: req.userId as string,
        },
      });
      if (newComment) {
        const newCommentImages = await Promise.all(
          images.map((item: any) =>
            prisma?.commentImage.create({
              data: {
                image: item,
                commentId: newComment.id,
              },
            })
          )
        );

        return res.json({ ...newComment, images: newCommentImages });
      }
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default isLogin(handler);
