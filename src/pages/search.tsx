import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AuthLayout from "../components/Layouts/AuthLayout";
import MainLayout from "../components/Layouts/MainLayout";
import WidthLayout from "../components/Layouts/WidthLayout";
import Meta from "../components/Meta";
import ResultSearch from "../components/ResultSearch";
import SearchTool from "../components/SearchTool";
import { CategoryModel } from "../models/category.model";
import { ProductModel, Products } from "../models/product.model";
import CategoryApi from "../services/category";
import SearchApi from "../services/search";

type SearchProps = {
  categories: CategoryModel[],
  products: Products

}

const Search: React.FC<SearchProps> = ({ categories, products }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
            <div className="mx-auto flex max-w-[calc(100%-16px)] pt-6 pb-6">
              <SearchTool categories={categories} />
              <ResultSearch data={products} />
            </div>
          </WidthLayout>
        </MainLayout>
      </AuthLayout>
    </>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const data = await Promise.all([CategoryApi.getCategory(), SearchApi.filter(query)])

  return {
    props: {
      categories: data[0],
      products: data[1]
    },
  };
};

