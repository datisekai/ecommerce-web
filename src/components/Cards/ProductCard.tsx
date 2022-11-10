import Link from "next/link";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ProductModel } from "../../models/product.model";
import { formatPrices, formatPrices1 } from "../../utils";

const ProductCard: FC<ProductModel> = ({
  categoryId,
  createdAt,
  description,
  id,
  image,
  maxPrice,
  minPrice,
  name,
  qtySold,
  slug,
}) => {
  return (
    <Link href={`/${slug}`}>
      <div className="parentProductSame relative  rounded-sm border border-transparent bg-white shadow-md  hover:cursor-pointer hover:border-primary">
        <LazyLoadImage
          alt={name}
          effect="black-and-white"
          className="block aspect-[1/1]"
          src={image || "https://source.unsplash.com/random"}
        />
        <div className="mt-1 px-3 pb-3">
          <h4 className="text-[12px] text-black line-clamp-2 lg:text-[14px]">
            {name}
          </h4>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-[15px] text-primary lg:text-[16px]">
              {maxPrice === minPrice ? (
                <span>{formatPrices(maxPrice)}</span>
              ) : (
                <div className="flex items-center">
                  <span>{formatPrices1(minPrice)}</span>
                  <span className="px-1">-</span>
                  <span>{formatPrices1(maxPrice)}</span>
                </div>
              )}
            </div>
            <span className="text-[12px] text-gray-500 lg:text-[13px]">
              Đã bán {formatPrices1(qtySold)}
            </span>
          </div>
        </div>
        <div className="productSame absolute z-[100] hidden w-full rounded-sm bg-secondary p-2 shadow-md transition-all">
          <h4 className="text-center text-[14px] text-white line-clamp-1 lg:text-[15px]">
            Tìm sản phẩm tương tự
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
