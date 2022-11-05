import React from "react";
import Divider from "../Divider";
import FilterStarItem from "./FilterStarItem";

const FilterStar = () => {
  return (
    <div className="mt-4 text-[16px] capitalize">
      <h2 className="mt-2">Đánh giá</h2>
      <div className="mt-2">
        <FilterStarItem star={5} />
        <FilterStarItem star={4} />
        <FilterStarItem star={3} />
        <FilterStarItem star={2} />
        <FilterStarItem star={1} />
      </div>
      <Divider />
    </div>
  );
};

export default FilterStar;
