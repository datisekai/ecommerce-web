import React, { FC, useEffect, useMemo, useState } from "react";
import ProductCard from "../Cards/ProductCard";
import WidthLayout from "../Layouts/WidthLayout";
import { AiOutlineRight } from "react-icons/ai";
import { ProductModel, Products } from "../../models/product.model";
import { useQuery } from "@tanstack/react-query";
import ProductApi from "../../services/product";

type SectionMainProps = {
  mt?: number;
  data: Products;
};

const SectionMain: FC<SectionMainProps> = ({ mt = 7, data }) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [page, setPage] = useState(1);

  const { data: dataMore, isLoading }: any = useQuery(["more", page], () => {
    if (page > 1) {
      return ProductApi.home(page);
    }
  });

  useEffect(() => {
    setProducts(data.products);
  }, [data]);

  useEffect(() => {
    if (dataMore) {
      setProducts([...products, ...dataMore.products]);
    }
  }, [dataMore]);

  const totalPage = useMemo(() => {
    return data.totalPage;
  }, [data]);

  return (
    <div className={`mt-${mt}`}>
      <WidthLayout>
        <div>
          <div className="flex items-center justify-between border-b-[5px] border-secondary bg-white p-[20px]">
            <h2 className="text-center text-[15px] font-medium uppercase text-primary lg:text-[18px]">
              Gợi ý hôm nay
            </h2>

            <div className="flex items-center lg:hidden">
              <button className="text-[14px] text-gray-500">Xem thêm</button>
              <AiOutlineRight className="text-[14px] text-gray-500" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
            {products?.map((item: ProductModel, index: number) => (
              <ProductCard key={index} {...item} />
            ))}
          </div>

          {page < totalPage && (
            <div className="mt-7 flex items-center justify-center">
              <button
                onClick={() => setPage(page + 1)}
                className="rounded-sm border bg-white py-3 px-4 text-[16px] capitalize text-gray-700 transition-all hover:bg-[rgba(0,0,0,0.1)]"
              >
                Xem thêm
              </button>
            </div>
          )}
        </div>
      </WidthLayout>
    </div>
  );
};

export default SectionMain;
