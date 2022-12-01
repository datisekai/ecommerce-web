import axiosClient from "../config/axiosClient"

type DataAdd = {
    content:string, pointStar:number, productIds:number[], images:String[]
}

type CommentApiProps = {
    addComments:(data:DataAdd) => Promise<any>
}

const CommentApi:CommentApiProps = {
    addComments:async(data) => {
        const results = await Promise.all(data.productIds.map(item => axiosClient.post('/comment',{
            ...data,
            productIds:undefined,
            productId:item
        })))
        return "success"
    }
}

export default CommentApi;