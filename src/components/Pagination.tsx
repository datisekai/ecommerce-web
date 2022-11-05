import React, { FC } from "react";
import { AiOutlineDown, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type PaginationProps = {
  page?: number;
  totalPage: number;
  onChange?: () => void;
};

const Pagination: FC<PaginationProps> = ({ page = 1, totalPage, onChange }) => {
  return (
    <div className="flex items-center ">
      <AiOutlineLeft className="mx-4 cursor-pointer text-[17px] transition-all hover:text-primary" />
      {Array.from(Array(totalPage).keys()).map(
        (item: number, index: number) =>
          index < 5 && (
            <span
              className={`cursor-pointer rounded-sm  px-4 py-2 text-[17px] transition-all hover:text-primary ${
                page === item + 1 && "bg-primary text-white hover:text-white"
              }`}
            >
              {item + 1}
            </span>
          )
      )}
      {totalPage > 5 && (
        <span
          className={`cursor-pointer rounded-sm  px-4 py-2 text-[17px] transition-all hover:text-primary `}
        >
          ...
        </span>
      )}
      <AiOutlineRight className="mx-4 cursor-pointer text-[17px] transition-all  hover:text-primary" />
    </div>
  );
};

export default Pagination;
