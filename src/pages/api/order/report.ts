import { NextApiResponse } from "next";
import isLogin from "../../../../middlewares/isLogin";
import INextApiRequest from "../../../models/NextApiRequest";
import { logError } from "../../../utils/logError";
import missing from "../../../utils/missing";
import notAuthorized from "../../../utils/notAuthorized";

const handler = async(req:INextApiRequest, res:NextApiResponse) => {
    if(req.method === "POST"){
        const {orderId, description, images} = req.body;
        if(!orderId || !description || !images){
            return missing(res);
        }

        try {
            const currentOrder = await prisma.order.findFirst({
                where:{
                    id:Number(orderId)
                }
            })

            if(currentOrder){
                if(currentOrder.userId == req.userId){
                    const newReportOrder = await prisma.orderReport.create({
                        data:{
                            description,
                            isDone:false,
                            orderId:Number(orderId),
                        }
                    })

                    const newReportImages = await Promise.all(images.map((item:string) => prisma.orderReportImage.create({
                        data:{
                            orderReportId:newReportOrder.id,
                            image:item
                        }
                    })))

                    return res.json({orderReport:newReportOrder, reportImages:newReportImages})
                }
                return notAuthorized(res);
            }
            return missing(res);
        } catch (error) {
            return logError(res, error);
        }
    }
}

export default isLogin(handler)