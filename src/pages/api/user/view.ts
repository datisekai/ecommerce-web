import { NextApiRequest, NextApiResponse } from "next";
import missing from "../../../utils/missing";

const handler = async(req:NextApiRequest, res:NextApiResponse) => {
    const {id} = req.query;
    console.log(id)
    if(!id){
        return missing(res);
    }

    if(req.method === "GET"){
        const user = await prisma.user.findFirst({
            where:{
                id:id.toString(),
            },
            select:{
                id:true,
                image:true,
                phone:true,
                email:true,
                createdAt:true,
                name:true,
                nameShop:true,
                _count:true,
        
            },
           
        })
        return res.json(user)
    }
}

export default handler;