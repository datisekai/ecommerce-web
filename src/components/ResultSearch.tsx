import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";
import { AiOutlineDown, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { VscInfo } from "react-icons/vsc";
import { ProductModel, Products } from "../models/product.model";
import ProductCard from "./Cards/ProductCard";

type ResultSearchProps = {
  isMain?: boolean;
  data: Products;
};

const ResultSearch: FC<ResultSearchProps> = ({ isMain = true, data }) => {
  const router = useRouter();
  return (
    <div className="flex-1 pl-4">
      {isMain && router.query.name && (
        <div className="flex items-center">
          <VscInfo className="text-[17px]" />
          <h5 className="ml-2 text-[17px]">
            Kết quả tìm kiếm cho từ khóa &quot;
            <strong className="text-red-500">{router.query?.name}</strong>&quot;
          </h5>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between bg-[rgba(0,0,0,.03)] px-4 py-3">
        <div className="flex items-center">
          <span className="text-[17px]">Sắp xếp theo</span>
          <button
            onClick={() =>
              router.push({
                query: {
                  ...router.query,
                  sortBy: "relevancy",
                },
              })
            }
            className={`ml-3 rounded-sm  px-4 py-2 text-[17px] capitalize  ${
              !router.query.sortBy || router.query.sortBy === "relevancy"
                ? "bg-primary text-white"
                : "bg-white text-black"
            }`}
          >
            Liên quan
          </button>
          <button
            onClick={() =>
              router.push({
                query: {
                  ...router.query,
                  sortBy: "ctime",
                },
              })
            }
            className={`ml-3 rounded-sm  px-4 py-2 text-[17px] capitalize  ${
              router.query.sortBy && router.query.sortBy === "ctime"
                ? "bg-primary text-white"
                : "bg-white text-black"
            }`}
          >
            Mới nhất
          </button>
          <button
            onClick={() =>
              router.push({
                query: {
                  ...router.query,
                  sortBy: "sales",
                },
              })
            }
            className={`ml-3 rounded-sm  px-4 py-2 text-[17px] capitalize  ${
              router.query.sortBy && router.query?.sortBy === "sales"
                ? "bg-primary text-white"
                : "bg-white text-black"
            }`}
          >
            Bán chạy
          </button>
          {/* <div className={`showMenuPrice relative ml-3 flex w-[200px] cursor-pointer items-center justify-between  px-4 py-2 text-[17px] ${router.query && router.query?.sortBy?.indexOf("price") !== -1 ? "bg-primary text-white" : "bg-white"}`}>
            <span>Giá</span>
            <AiOutlineDown />
            <ul className=" menuPrice absolute top-[38px] left-0 z-10 hidden w-[200px] bg-white py-2 transition-all ">
              <li
                onClick={() =>
                  router.push({
                    query: {
                      ...router.query,
                      sortBy: "priceDesc",
                    },
                  })
                }
                className={`py-2 px-4 transition-all hover:text-primary ${router.query && router.query?.sortBy === "priceDesc" ? 'text-primary' : 'text-black'}`}
              >
                Giá: Thấp đến Cao
              </li>
              <li
                onClick={() =>
                  router.push({
                    query: {
                      ...router.query,
                      sortBy: "priceAsc",
                    },
                  })
                }
                className={`py-2 px-4 transition-all hover:text-primary ${router.query && router.query?.sortBy === "priceAsc" ? 'text-primary' : 'text-black'}`}
              >
                Giá: Cao đến Thấp
              </li>
            </ul>
          </div> */}
        </div>
        {/* <div className="flex items-center">
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
        </div> */}
      </div>
      <div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {data?.products.map((item: ProductModel, index: number) => (
            <ProductCard key={index} {...item} />
          ))}
        </div>
        <div className="mt-7 flex items-center justify-center">
          <Pagination
            onChange={(e, page) =>
              router.push({
                query: {
                  ...router.query,
                  page,
                },
              })
            }
            page={router.query.page ? +router.query.page : 1}
            count={data.totalPage}
            shape={"rounded"}
            sx={{
              ".css-10w330c-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                {
                  bgcolor: "#f53d2d",
                  color: "white  ",
                },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultSearch;
