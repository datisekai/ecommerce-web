import { useRouter } from "next/router";
import React, { FC } from "react";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Divider from "../Divider";

type FilterStarItemProps = {
  star: number;
  isText?: boolean;
  isStar?: boolean;
  color?: string;
  onClick?:(star:number) => void
};

const FilterStarItem: FC<FilterStarItemProps> = ({
  star = 0,
  isText = true,
  isStar = false,
  color = "text-yellow-500",
  onClick
}) => {


  return (
    <div className=" flex cursor-pointer items-center py-2" onClick={() => onClick(star)}>
      {isStar && (
        <span className="mr-2  text-[18px] text-primary underline">{star}</span>
      )}
      {[1, 2, 3, 4, 5].map((item: number, index: number) => {
        if (index < Math.round(star)) {
          return <AiFillStar key={index} className={`text-[20px] ${color || 'text-yellow-500  '}`} />;
        }
        return <AiOutlineStar key={index} className={`text-[20px] ${color || 'text-yellow-500 '}`} />;
      })}
      {isText && (
        <span className="ml-2 text-[15px] lowercase">từ {star} sao</span>
      )}
    </div>
  );
};

export default FilterStarItem;
