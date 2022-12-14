import React, { FC } from "react";
import CategoryCard from "../Cards/CategoryCard";
import WidthLayout from "../Layouts/WidthLayout";

import { AiOutlineRight } from "react-icons/ai";
import { CategoryModel } from "../../models/category.model";

type Section1Props = {
  mt?: number;
  data: CategoryModel[];
};

const Section1: FC<Section1Props> = ({ mt = 7, data }) => {
  return (
    <div className={`mt-${mt}`}>
      <WidthLayout>
        <div className="bg-white pt-[20px]">
          <div className="mt-2 mb-5 flex items-center justify-between px-[20px]">
            <h3 className=" text-[15px] font-thin uppercase text-gray-500 lg:text-[17px]">
              Danh mục
            </h3>
            <div className="flex items-center lg:hidden">
              <button className="text-[14px] text-gray-500">Xem thêm</button>
              <AiOutlineRight className="text-[14px] text-gray-500" />
            </div>
          </div>
          <div className="mt-2 flex overflow-scroll lg:grid lg:grid-cols-10 lg:overflow-auto">
            {data?.map((item: CategoryModel, index: number) => (
              <CategoryCard key={index} {...item} />
            ))}
          </div>
        </div>
      </WidthLayout>
    </div>
  );
};
export default Section1;
