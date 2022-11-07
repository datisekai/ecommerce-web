import MainLayout from "../components/Layouts/MainLayout";
import WidthLayout from "../components/Layouts/WidthLayout";
import Meta from "../components/Meta";
import ResultSearch from "../components/ResultSearch";
import SearchTool from "../components/SearchTool";

const Search = () => {
  return (
    <>
      <Meta
        image="https://glints.com/vn/blog/wp-content/uploads/2022/10/chie%CC%82%CC%81n-di%CC%A3ch-truye%CC%82%CC%80n-tho%CC%82ng-cu%CC%89a-shopee.jpeg"
        description="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
        title="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
      />
      <MainLayout>
        <WidthLayout>
          <div className="mx-auto flex max-w-[calc(100%-16px)] pt-6 pb-6">
            <SearchTool />
            <ResultSearch />
          </div>
        </WidthLayout>
      </MainLayout>
    </>
  );
};

export default Search;
