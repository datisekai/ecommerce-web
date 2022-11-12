import Link from "next/link";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CategoryModel } from "../../models/category.model";

const CategoryCard: FC<CategoryModel> = ({
  id,
  image,
  name,
  parentId,
  sellerId,
}) => {
  return (
    <Link href={`/search?categoryId=${id}`}>
    <div className="w-[107px] border-r border-b border-t border-[rgba(0,0,0,0.05)] p-2 transition-all hover:cursor-pointer hover:shadow-lg lg:w-full">
      <LazyLoadImage
        alt={name}
        effect="black-and-white"
        className="aspect-[1/1]"
        src={
          image ||
          "https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn"
        }
      />
      <h4 className="overflow-x-hidden text-ellipsis whitespace-nowrap text-[13px] capitalize lg:whitespace-normal lg:text-center lg:text-[15px] lg:line-clamp-2">
        {name}
      </h4>
    </div></Link>
  );
};

export default CategoryCard;
