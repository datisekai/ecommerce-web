import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrices } from "../../utils";

const ProductCartCard = () => {
  return (
    <div className="flex items-center border-b py-5 px-10 last:border-none ">
      <div className="flex w-[50%] items-center pr-4">
        <input type="checkbox" name="" id="" className="h-4 w-4" />
        <div className="ml-5 flex items-center ">
          <LazyLoadImage
            src="https://source.unsplash.com/random"
            className="aspect-[1/1] w-[80px] rounded-sm"
          />
          <h3 className="px-4 text-[16px] line-clamp-2">
            Áo khoác dù nam mặc được 2 mặt thêu Logo ANPAI thời trang cao cấp
          </h3>
        </div>
        <span className="text-[16px] text-[#666] line-clamp-2">
          Phân loại hàng: <span>Màu trắng, Size L</span>
        </span>
      </div>
      <div className="flex flex-1 items-center justify-between ">
        <h5 className="text-[16px] text-[#666]">{formatPrices(79000)}</h5>
        <div className="ml-4 flex items-center rounded-sm border">
          <AiOutlineMinus className="my-2 mx-2 cursor-pointer" />
          <input
            type="text"
            className="h-full w-[50px] text-center text-[17px] outline-none"
            value={1}
          />
          <AiOutlinePlus className="my-2 mx-2 cursor-pointer " />
        </div>
        <h5 className="ml-4 text-[16px]  text-primary">
          {formatPrices(79000)}
        </h5>
        <h5 className="ml-4 text-[16px] text-[#666] transition-all hover:text-primary">
          Xóa
        </h5>
      </div>
    </div>
  );
};

export default ProductCartCard;
