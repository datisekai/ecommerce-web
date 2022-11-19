import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import missing from '../../../utils/missing';
const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {id} = req.query;
    if(!id){
        return missing(res);
    }

    if(req.method === "GET"){
        const seller = await prisma.user.findFirst({
            where:{
                id:id as string
            },
            include:{
                
            }
        })
    }
}

export default handler;