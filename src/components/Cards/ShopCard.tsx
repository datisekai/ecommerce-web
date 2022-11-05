import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../Button";
import { AiOutlineShop } from "react-icons/ai";
import Divider from "../Divider";

const ShopCard = () => {
  return (
    <div className="flex flex-col items-center justify-between rounded-sm bg-white p-4 shadow-sm lg:flex-row">
      <div className="flex items-center ">
        <LazyLoadImage
          src="https://source.unsplash.com/random"
          className="h-[78px] w-[78px] rounded-full"
        />
        <div className="ml-4">
          <h4 className="text-[17px]">Shop_Fasion_style</h4>
          <Button
            startIcon={AiOutlineShop}
            classNameStarIcon={"mr-2"}
            className="mt-4 border px-4 py-2 transition-all hover:border-primary"
            text="Xem Shop"
          />
        </div>
      </div>
      <div className="hidden lg:block">
        <Divider width="1px" height="50px" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 lg:mt-0">
        <div className="flex items-center">
          <span className="text-[16px] text-[#666]">Sản phẩm</span>
          <span className="ml-2 text-[16px] text-primary">124</span>
        </div>
        <div className="flex items-center">
          <span className="text-[16px] text-[#666]">Tham gia</span>
          <span className="ml-2 text-[16px] text-primary">29 tháng trước</span>
        </div>
        <div className="flex items-center">
          <span className="text-[16px] text-[#666]">Đánh giá</span>
          <span className="ml-2 text-[16px] text-primary">2,9k</span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
