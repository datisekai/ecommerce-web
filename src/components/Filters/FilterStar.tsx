import { useRouter } from "next/router";
import React from "react";
import Divider from "../Divider";
import FilterStarItem from "./FilterStarItem";

const FilterStar = () => {

  const router = useRouter();

  const handleApplyStar = (star:number) => {
      router.push({
        query:{
          ...router.query,
          point_star:star.toString()
        }
      })
  }


  return (
    <div className="mt-4 text-[16px] capitalize">
      <h2 className="mt-2">Đánh giá</h2>
      <div className="mt-2">
        <FilterStarItem star={5}  onClick={handleApplyStar}/>
        <FilterStarItem star={4} onClick={handleApplyStar}/>
        <FilterStarItem star={3} onClick={handleApplyStar}/>
        <FilterStarItem star={2} onClick={handleApplyStar}/>
        <FilterStarItem star={1} onClick={handleApplyStar}/>
      </div>
      <Divider />
    </div>
  );
};

export default FilterStar;
