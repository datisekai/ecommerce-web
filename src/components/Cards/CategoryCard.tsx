import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CategoryCard = () => {
  return (
    <div className="w-[107px] border-r border-b border-t border-[rgba(0,0,0,0.05)] p-2 transition-all hover:cursor-pointer hover:shadow-lg lg:w-full">
      <LazyLoadImage
        alt={"https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn"}
        effect="black-and-white"
        className="aspect-[1/1]"
        src={"https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn"}
      />
      <h4 className="overflow-x-hidden text-ellipsis whitespace-nowrap text-[13px] capitalize lg:whitespace-normal lg:text-center lg:text-[15px] lg:line-clamp-2">
        Thời trang Nam
      </h4>
    </div>
  );
};

export default CategoryCard;
