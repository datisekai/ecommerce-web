import React from "react";
import MainLayout from "../components/Layouts/MainLayout";
import WidthLayout from "../components/Layouts/WidthLayout";
import { CiFilter } from "react-icons/ci";
import FilterCategory from "../components/Filters/FilterCategory";
import Divider from "../components/Divider";
import FilterPrice from "../components/Filters/FilterPrice";
import FilterStar from "../components/Filters/FilterStar";
import Button from "../components/Button";
import { VscInfo } from "react-icons/vsc";
import { AiOutlineDown, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ProductCard from "../components/Cards/ProductCard";
import Pagination from "../components/Pagination";

const Search = () => {
  return (
    <MainLayout>
      <WidthLayout>
        <div className="mx-auto flex max-w-[calc(100%-16px)] pt-6 pb-6">
          <div className="hidden w-[205px] lg:block">
            <div className="flex items-center">
              <CiFilter className="text-[19px]" />
              <h1 className="ml-1 text-[17px] font-semibold uppercase">
                Bộ lọc tìm kiếm
              </h1>
            </div>
            <FilterCategory />
            <FilterPrice />
            <FilterStar />
            <Button
              text="Xóa tất cả"
              className="mt-4 justify-center bg-primary py-2 text-center uppercase text-white"
            />
          </div>
          <div className="flex-1 pl-4">
            <div className="flex items-center">
              <VscInfo className="text-[17px]" />
              <h5 className="ml-2 text-[17px]">
                Kết quả tìm kiếm cho từ khóa &quot;
                <strong className="text-red-500">áo</strong>&quot;
              </h5>
            </div>

            <div className="mt-4 flex items-center justify-between bg-[rgba(0,0,0,.03)] px-4 py-3">
              <div className="flex items-center">
                <span className="text-[17px]">Sắp xếp theo</span>
                <button className="ml-3 rounded-sm bg-primary px-4 py-2 text-[17px] capitalize text-white">
                  Liên quan
                </button>
                <button className="ml-3 rounded-sm bg-white px-4 py-2 text-[17px] capitalize">
                  Mới nhất
                </button>
                <button className="ml-3 rounded-sm bg-white px-4 py-2 text-[17px] capitalize">
                  Bán chạy
                </button>
                <div className="showMenuPrice relative ml-3 flex w-[200px] cursor-pointer items-center justify-between bg-white px-4 py-2 text-[17px]">
                  <span>Giá</span>
                  <AiOutlineDown />
                  <ul className=" menuPrice absolute top-[38px] left-0 z-10 hidden w-[200px] bg-white py-2 transition-all ">
                    <li className="py-2 px-4 transition-all hover:text-primary">
                      Giá: Thấp đến Cao
                    </li>
                    <li className="py-2 px-4 transition-all hover:text-primary">
                      Giá: Thấp đến Cao
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-[17px]">
                  <span className="text-primary">1</span>/50
                </span>
                <div className="ml-3 flex items-center">
                  <div className="flex h-[34px] w-[36px] cursor-pointer items-center justify-center rounded-sm border border-[#999] hover:bg-white">
                    <AiOutlineLeft className="text-[15px]" />
                  </div>
                  <div className="ml-1 flex h-[34px] w-[36px] cursor-pointer items-center justify-center rounded-sm border border-[#999] hover:bg-white">
                    <AiOutlineRight className="text-[15px]" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {Array.from(Array(30).keys()).map(
                  (item: number, index: number) => (
                    <ProductCard key={index} />
                  )
                )}
              </div>
              <div className="mt-7 flex items-center justify-center">
                {/* <Pagination defaultActivePage={1} totalPages={5} /> */}
                <Pagination page={1} totalPage={10} />
              </div>
            </div>
          </div>
        </div>
      </WidthLayout>
    </MainLayout>
  );
};

export default Search;