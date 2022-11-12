import axiosClient from '../config/axiosClient';
import { ProductModel } from './../models/product.model';

type filterData = {
    name?:string,
    page?:number
    limit?:number
    categoryId?:number
}

type SearchApiProps = {
    filter:(data:filterData) => Promise<ProductModel[]>
}
const SearchApi:SearchApiProps = {
    filter:async(data:filterData) => {
        const result = await axiosClient.get('/product/filter',{
            params:data
        })
        return result.data
    }
}

export default SearchApi