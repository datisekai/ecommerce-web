import axiosClient from "../config/axiosClient";
import { SellerModel } from "../models/seller.model";

type SellerApiProps = {
    view:(id:string) => Promise<SellerModel>
}

const SellerApi:SellerApiProps = {
    view:async(id:string) => {
        const result = await axiosClient.get('/user/view',{
            params:{
                id
            }
        })
        return result.data
    },
  
}

export default SellerApi;