import { logError } from "./../../../utils/logError";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import isLogin from "../../../../middlewares/isLogin";
import { prisma } from "../../../server/db/client";
import INextApiRequest from "../../../models/NextApiRequest";
import missing from "../../../utils/missing";

const contactUser = async (req: INextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { address, phone, name } = req.body;
    if (!address || !phone || !name) {
      return res.status(404).json({ success: false, message: "Missing" });
    }

    try {
      const newContact = await prisma?.contactUser.create({
        data: {
          address,
          name,
          phone,
          userId: req.userId,
        },
      });
      return res.json(newContact);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) {
      return res.status(404).json({ success: false, message: "Missing" });
    }

    try {
      const deleteContact = await prisma?.contactUser.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json(deleteContact);
    } catch (error) {
      return logError(res, error);
    }
  } else if (req.method === "PUT") {
    const data = req.body;
    const { id } = req.query;
    if (!id) {
      return res.status(404).json({ success: false, message: "Missing" });
    }

    try {
      const updateContact = await prisma?.contactUser.update({
        where: {
          id: Number(id),
        },
        data,
      });
      return res.json(updateContact);
    } catch (error) {
      return logError(res, error);
    }
  }else if(req.method === "GET"){
    try {
      const contacts = await prisma.contactUser.findMany({
        where:{
          userId:req.userId
        }
      })
      
      return res.json(contacts)
    } catch (error) {
      return logError(res, error)
    }
  }else if(req.method === "PATCH"){
    const {id} = req.query;
    if(!id){
      return missing(res);
    }

    try {
      const currentActive = await prisma.contactUser.findFirst({
        where:{
          active:true
        }
      })

      if(currentActive){
        await prisma.contactUser.update({
          where:{
            id:Number(currentActive.id)
          },
          data:{
            active:false
          }
        })
      }

      const newActive = await prisma.contactUser.update({
        where:{
          id:Number(id),
        },
        data:{
          active:true
        }
      })

      return res.json(newActive);

    } catch (error) {
      return logError(res, error);
    }
  }
};

export default isLogin(contactUser);
