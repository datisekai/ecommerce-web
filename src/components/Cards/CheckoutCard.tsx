import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrices } from "../../utils";

const CheckoutCard = () => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex w-[45%] items-center">
        <LazyLoadImage
          src="https://source.unsplash.com/random"
          className="aspect-[1/1] w-[40px] rounded-sm"
        />
        <h3 className="w-[60%] px-2 text-[16px] line-clamp-1">
          Áo Sơ Mi Trắng Fom Trơn Bassic Dài Tay Lụa Hàn Mát Mịn Phong Cách
          Ulzzang Hàn Quốc Thiết Kế Minxinh
        </h3>
        <span className="text-[16px[ text-[#666]">Loại: Màu trắng, Size L</span>
      </div>
      <div className="grid w-[50%] grid-cols-3 gap-4">
        <p>{formatPrices(20000)}</p>
        <p>1</p>
        <p>{formatPrices(50000)}</p>
      </div>
    </div>
  );
};

export default CheckoutCard;
