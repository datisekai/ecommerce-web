import React, { FC } from "react";
import ProductCard from "../Cards/ProductCard";
import WidthLayout from "../Layouts/WidthLayout";
import { AiOutlineRight } from "react-icons/ai";

type SectionMainProps = {
  mt?: number;
};

const SectionMain: FC<SectionMainProps> = ({ mt = 7 }) => {
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
            {Array.from(Array(48).keys()).map((item: number, index: number) => (
              <ProductCard key={index} />
            ))}
          </div>

          <div className="mt-7 flex items-center justify-center">
            <button className="rounded-sm border bg-white py-3 px-4 text-[16px] capitalize text-gray-700 transition-all hover:bg-[rgba(0,0,0,0.1)]">
              Xem thêm
            </button>
          </div>
        </div>
      </WidthLayout>
    </div>
  );
};

export default SectionMain;
