import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrices } from "../../utils";

const ProductCard = () => {
  return (
    <div className="parentProductSame relative  rounded-sm border border-transparent bg-white shadow-md  hover:cursor-pointer hover:border-primary">
      <LazyLoadImage
        alt={"https://cf.shopee.vn/file/e9a1464780d98ef4ef9b9c32ce8e02b8_tn"}
        effect="black-and-white"
        className="block aspect-[1/1]"
        src={"https://cf.shopee.vn/file/e9a1464780d98ef4ef9b9c32ce8e02b8_tn"}
      />
      <div className="mt-1 px-3 pb-3">
        <h4 className="text-[12px] text-black line-clamp-2 lg:text-[14px]">
          Áo khoác dù nam mặc được 2 mặt thêu Logo ANPAI thời trang cao cấp
        </h4>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-[15px] text-primary lg:text-[16px]">
            <span>{formatPrices(20000)}</span>
          </div>
          <span className="text-[12px] text-gray-500 lg:text-[13px]">
            Đã bán 128
          </span>
        </div>
      </div>
      <div className="productSame absolute z-[100] hidden w-full rounded-sm bg-secondary p-2 shadow-md transition-all">
        <h4 className="text-center text-[14px] text-white line-clamp-1 lg:text-[15px]">
          Tìm sản phẩm tương tự
        </h4>
      </div>
    </div>
  );
};

export default ProductCard;
