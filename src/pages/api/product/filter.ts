import { logError } from "./../../../utils/logError";
import { NextApiResponse } from "next";
import INextApiRequest from "../../../models/NextApiRequest";
import { prisma } from "../../../server/db/client";


const handler = async (req: INextApiRequest, res: NextApiResponse) => {
  const data: any = req.query;
  const { page = 1, limit = 12 } = data;
  const skip = (+page - 1) * +limit;


  let sortBy:"relevancy" | "ctime" | "sales" | "priceAsc" | "priceDesc"  = "relevancy";
  let orderBy,orderByProduct;

  delete data['page'];
  delete data['limit']
  let star = 0;
  if (data.name) {
    data.name = {
      contains: data.name,
    };
  }

  if(data.sortBy){
    sortBy = data.sortBy;
    if(sortBy === "priceAsc"){
      orderBy = {
        price:'asc'
      }
    }else if(sortBy === "priceDesc"){
      orderBy = {
        price:'desc'
      }
    }else if(sortBy === 'ctime'){
      orderByProduct = {
        createdAt:'desc'
      }
    }
    delete data["sortBy"]
  }

  if (data.categoryId) {
    data.categoryId = {
      in:[...data.categoryId.split(',').map((item:any) => +item)]
    }
  }

  if(data.categoryShopId){
    const productIds = await prisma.categoryProduct.findMany({
      where:{
        categoryId:+data.categoryShopId,
      },
      select:{
        productId:true
      }
    })
    if(data.id){
      data.id = {
        ...data.id,
        in:[...data.id.in, ...productIds.map((item:any) => item.productId)]
      }
    }else{
      data.id = {
        in:productIds.map((item:any) => item.productId )
      }
    }
    delete data['categoryShopId']
  }

  if(data.maxPrice && data.minPrice){
    const productIds = await prisma.sku.findMany({
      where:{
        price:{
          gte:+data.minPrice,
          lte:+data.maxPrice
        }
      },
      select:{
        productId:true
      },
      orderBy:orderBy
    })


    delete data['maxPrice']
    delete data['minPrice']

    if(data.id){
      data.id = {...data.id, in:[...data.id.in, ...productIds.map((item:any) => item.productId)]}
    }else{
      data.id = {
        in:productIds.map((item:any) => item.productId )
      }
    }
  }


  if(data.point_star){
    star = data.point_star;
    delete data["point_star"];  
    const result:any = await prisma.$queryRaw`SELECT product.id, AVG(comment.pointStar) from comment, product where comment.productId = product.id group by product.id having AVG(comment.pointStar) >= ${+star}`
    const productIds = result.map((item:any) => item.id);
   if(data.id){
    data.id = {...data.id, in:[...data.id.in, ...productIds]}
   }else{
    data.id = {
      in:productIds
    }
   }
  }


  if (req.method === "GET") {
    try {
      const products = await prisma?.product.findMany({
        where: {
          ...data,
        },
        take: +limit,
        skip,
        include: {
          skus: true,
          comments:{
            select:{
              pointStar:true
            }
          }
        },
        orderBy:orderByProduct
      });

      const counts  = await prisma?.product.count({
        where: {
          ...data,
        },
      });
      
      const qtys = await Promise.all(
        products.map((item: any) => {
          return prisma.orderDetail.count({
            where: {
              skuId: {
                in: item.skus.map((element: any) => element.id),
              },
            },
          });
        })
      );
      const productsReturn = products?.map((item: any, index: number) => {
        let maxPrice = item.skus[0].price;
        let minPrice =
          item.skus[0].price * ((100 - item.skus[0].discount) / 100);
        item.skus.forEach((element: any) => {
          if (element.price > maxPrice) {
            maxPrice = element.price;
          }
          if (element.price < minPrice) {
            minPrice = element.price * ((100 - element.discount) / 100);
          }
        });

        const currentStar = ((item.comments.reduce((total:any, current:any) => {
          return total + current.pointStar
        },0))/item.comments.length) || 1

        return {
          ...item,
          skus: undefined,
          minPrice,
          maxPrice,
          qtySold: qtys[index],
          currentStar,
          comments:undefined,
        };
      });

      return res.json({products:productsReturn, totalPage:Math.ceil(counts / +limit)});
    } catch (error) {
      return logError(res, error);
    }
  }
};

export default handler;

