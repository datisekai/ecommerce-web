import React, { useState } from "react";
import Divider from "../Divider";
import { AiOutlineMinus } from "react-icons/ai";
import Button from "../Button";
import { useRouter } from "next/router";

const FilterPrice = () => {
  const router = useRouter();
  const [minPrice, setMinPrice] = useState<number | undefined>(
    router.query.minPrice ? +router.query.minPrice : undefined
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    router.query.maxPrice ? +router.query.maxPrice : undefined
  );

  const handleApplyPrice = () => {
    if (maxPrice && minPrice !== undefined) {
      if (minPrice > maxPrice) {
        const temp = minPrice;
        const temp1 = maxPrice;
        setMinPrice(maxPrice);
        setMaxPrice(temp);
        router.push({
          query: {
            ...router.query,
            minPrice: temp1,
            maxPrice: temp,
          },
        });
      } else {
        router.push({
          query: {
            ...router.query,
            minPrice,
            maxPrice,
          },
        });
      }
    }
  };

  return (
    <div className="mt-4 text-[16px] capitalize">
      <h2 className="mt-2">Khoảng giá</h2>
      <div>
        <div className="mt-4 flex w-full items-center justify-between">
          <input
            type="text"
            value={minPrice}
            className="w-[50%] border px-2 py-2 text-[14px] outline-none placeholder:text-[14px] placeholder:text-[#ccc]"
            placeholder="₫ TỪ"
            onChange={(e: any) => setMinPrice(+e.target.value)}
          />
          <AiOutlineMinus className="mx-2" />
          <input
            type="text"
            value={maxPrice}
            className="w-[50%] border px-2 py-2 text-[14px] outline-none placeholder:text-[14px] placeholder:text-[#ccc]"
            placeholder="₫ ĐẾN"
            onChange={(e: any) => setMaxPrice(+e.target.value)}
          />
        </div>
        <Button
          onClick={handleApplyPrice}
          text="Áp dụng"
          className="mt-4 w-[205px] justify-center bg-primary px-2 py-2 text-center uppercase text-white"
        />
      </div>
      <Divider />
    </div>
  );
};

export default FilterPrice;
