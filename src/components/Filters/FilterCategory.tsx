import React, { useState } from "react";
import Button from "../Button";
import FilterCategoryItem from "./FilterCategoryItem";
import { AiOutlineDown } from "react-icons/ai";
import Divider from "../Divider";

const data = [
  {
    id: 1,
    label: "Thời trang trẻ em",
    count: 2,
  },
  {
    id: 2,
    label: "Thời trang nam",
    count: 5,
  },
  {
    id: 3,
    label: "Áo thun",
    count: 7,
  },
  {
    id: 4,
    label: "Áo sơ mi",
    count: 9,
  },
  {
    id: 5,
    label: "Đồ tập",
    count: 2,
  },
  {
    id: 6,
    label: "Hoodies và Áo nỉ",
    count: 2,
  },
];

const FilterCategory = () => {
  const [isFull, setIsFull] = useState(false);

  return (
    <div className="mt-4 text-[16px] capitalize">
      <h2 className="mt-2">Theo danh mục</h2>
      <div className="mt-2">
        {data.map((item: any, index: number) => {
          if (!isFull) {
            return index < 4 && <FilterCategoryItem key={index} {...item} />;
          } else {
            return <FilterCategoryItem key={index} {...item} />;
          }
        })}
        {!isFull && (
          <Button
            text="Thêm"
            className="mt-2 ml-6"
            onClick={() => setIsFull(true)}
            icon={AiOutlineDown}
            classNameIcon={"ml-2 text-[14px]"}
          />
        )}
      </div>
      <Divider />
    </div>
  );
};

export default FilterCategory;
