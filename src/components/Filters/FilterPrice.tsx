import React from "react";
import Divider from "../Divider";
import { AiOutlineMinus } from "react-icons/ai";
import Button from "../Button";

const FilterPrice = () => {
  return (
    <div className="mt-4 text-[16px] capitalize">
      <h2 className="mt-2">Khoảng giá</h2>
      <div>
        <div className="mt-4 flex w-full items-center justify-between">
          <input
            type="text"
            className="w-[50%] border px-2 py-2 text-[14px] outline-none placeholder:text-[14px] placeholder:text-[#ccc]"
            placeholder="₫ TỪ"
          />
          <AiOutlineMinus className="mx-2" />
          <input
            type="text"
            className="w-[50%] border px-2 py-2 text-[14px] outline-none placeholder:text-[14px] placeholder:text-[#ccc]"
            placeholder="₫ ĐẾN"
          />
        </div>
        <Button
          text="Áp dụng"
          className="mt-4 justify-center bg-primary py-2 text-center uppercase text-white"
        />
      </div>
      <Divider />
    </div>
  );
};

export default FilterPrice;
