import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FilterStarItem from "../Filters/FilterStarItem";

const ReviewCard = () => {
  return (
    <div className="mt-4 flex">
      <LazyLoadImage
        src="https://source.unsplash.com/random"
        className="h-[40px] w-[40px] rounded-full"
      />
      <div className="ml-4 flex-1">
        <h5>quocbao211</h5>
        <FilterStarItem isText={false} star={4.2} color="text-primary" />
        <p className="mt-2">2022-10-30 </p>
        <p className="mt-2">
          Hình ảnh ko liên quan đến sản phẩm như chất lượng tốt lắm nha mọi
          người
        </p>
        <div className="mt-2 grid max-w-full grid-cols-5 gap-2 lg:max-w-[50%]">
          {[1, 2, 3, 4, 5].map((item: number) => (
            <LazyLoadImage
              key={item}
              src="https://source.unsplash.com/random"
              className="aspect-[1/1] "
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
