import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrices } from "../../utils";

const CartCard = () => {
  return (
    <div className="mt-2 flex items-center justify-between">
      <div className="flex items-center">
        <LazyLoadImage
          className="aspect-[1/1] w-[50px] rounded-sm"
          src="https://source.unsplash.com/random"
        />
        <h3 className="px-2 text-[15px] line-clamp-1">
          Áo Sơ Mi Trắng Fom Trơn Bassic Dài Tay Lụa Hàn Mát Mịn Phong Cách
          Ulzzang Hàn Quốc Thiết Kế Minxinh
        </h3>
      </div>
      <div className="text-[17px] text-primary">{formatPrices(24000)}</div>
    </div>
  );
};

export default CartCard;
