import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrices } from "../../utils";

const ProductOrderCard = () => {
  return (
    <div className="mt-2 flex items-center justify-between border-b pb-2 last:border-none">
      <div className="flex w-[80%]">
        <LazyLoadImage
          className="aspect-[1/1] w-[80px] rounded-sm border"
          src="https://source.unsplash.com/random"
        />
        <div className="ml-2 px-2">
          <h3 className="text-[16px] line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde vitae
            iure provident quo labore molestiae placeat fugit aliquam velit!
            Ratione tempora aliquam fugit id in dolorem, delectus natus tempore
            incidunt.
          </h3>
          <p className="mt-1 text-[#666]">Phân loại hàng: Đỏ, Size L</p>
          <p className="mt-1">x1</p>
        </div>
      </div>
      <div className="flex-1 text-right text-primary">
        {formatPrices(20000)}
      </div>
    </div>
  );
};

export default ProductOrderCard;
