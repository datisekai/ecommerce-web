import React from "react";
import ProductCartCard from "../Cards/ProductCartCard";

const CartList = () => {
  return (
    <div className="mt-3 rounded-sm bg-white pt-3 shadow-sm">
      <div className="flex items-center border-b  px-10   py-5">
        <input type="checkbox" id="all" className="h-4 w-4" />
        <label htmlFor="all" className="pl-5 text-[16px]">
          Min Xinh Shop
        </label>
      </div>
      <div>
        <ProductCartCard />
        <ProductCartCard />
        <ProductCartCard />
        <ProductCartCard />
      </div>
    </div>
  );
};
export default CartList;
