import React from "react";
import ShopCard from "../../components/Cards/ShopCard";
import MainLayout from "../../components/Layouts/MainLayout";
import WidthLayout from "../../components/Layouts/WidthLayout";
import { TfiMenuAlt } from "react-icons/tfi";
import { useRouter } from "next/router";
import ResultSearch from "../../components/ResultSearch";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import ProductApi from "../../services/product";
import { Products } from "../../models/product.model";
import SellerApi from "../../services/seller";
import { SellerModel } from "../../models/seller.model";
import SearchApi from "../../services/search";
import CategoryApi from "../../services/category";
import { CategoryModel } from "../../models/category.model";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Meta from "../../components/Meta";

const data = [
  {
    id: 1,
    name: "Sản phẩm",
  },
  {
    id: 2,
    name: "Giảm giá",
  },
  {
    id: 3,
    name: "Hàng mới về",
  },
];

type ShopProps = {
  products:Products
  seller:SellerModel
  category:CategoryModel[]
}

const Shop:NextPage<ShopProps> = ({products,seller,category}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { categoryShopId = 0 } = router.query;


  return (
  <>
    <Meta
        image="https://glints.com/vn/blog/wp-content/uploads/2022/10/chie%CC%82%CC%81n-di%CC%A3ch-truye%CC%82%CC%80n-tho%CC%82ng-cu%CC%89a-shopee.jpeg"
        description="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
        title="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
      />
  <AuthLayout>
  <MainLayout>
      <WidthLayout>
        <div className="mx-auto max-w-[calc(100%-16px)] py-6">
          <ShopCard createdAt={seller.createdAt.toString()} qtyComment={seller._count.comments} email={seller.email} id={seller.id} image={seller.image} name={seller.name}   qty={seller._count.products}/>
          <div className="mt-4 flex justify-between">
            <div className="w-[180px] px-2 py-2">
              <div className="flex items-center border-b py-2">
                <TfiMenuAlt className="text-[18px]" />
                <span className="ml-2 text-[17px]">Danh mục</span>
              </div>
              <ul className="mt-2">
                  <li
                  onClick={() => router.push(`/shop/${router.query.id}`)}
                    className={`py-2 transition-all hover:cursor-pointer hover:text-primary ${
                      categoryShopId === 0 && "text-primary"
                    }`}
                  >
                    Sản phẩm
                  </li> 
                {category?.map((item: CategoryModel) => (
                  <li
                  onClick={() => router.push({
                    query:{
                      ...router.query,
                      categoryShopId:item.id
                    }
                  })}
                    key={item.id}
                    className={`py-2 transition-all hover:cursor-pointer hover:text-primary ${
                      item.id == categoryShopId && "text-primary"
                    }`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <ResultSearch isMain={false} data={products}/>
          </div>
        </div>
      </WidthLayout>
    </MainLayout>
  </AuthLayout>
  </>
  );
};

export default Shop;

export const getServerSideProps:GetServerSideProps = async ({query}) => {
  const filter = {...query, sellerId:query.id as string, id:undefined}
  const data = await Promise.all([SearchApi.filter(filter),SellerApi.view(query.id as string), CategoryApi.getCategorySeller(query.id as string)])
  
  return {
    props:{
      products:data[0],
      seller:data[1],
      category:data[2]
    }
  }
}