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
        <FilterStarItem star={5} color={router.query && router.query.point_star && router.query.point_star === '5' && 'text-primary'}  onClick={handleApplyStar}/>
        <FilterStarItem star={4} color={router.query && router.query.point_star && router.query.point_star === '4' && 'text-primary'} onClick={handleApplyStar}/>
        <FilterStarItem star={3} color={router.query && router.query.point_star && router.query.point_star === '3' && 'text-primary'} onClick={handleApplyStar}/>
        <FilterStarItem star={2} color={router.query && router.query.point_star && router.query.point_star === '2' && 'text-primary'} onClick={handleApplyStar}/>
        <FilterStarItem star={1} color={router.query && router.query.point_star && router.query.point_star === '1' && 'text-primary'} onClick={handleApplyStar}/>
      </div>
      <Divider />
    </div>
  );
};

export default FilterStar;
