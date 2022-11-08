import React from "react";
import Button from "../Button";
import { AiOutlineShop, AiOutlineFileProtect } from "react-icons/ai";
import ProductOrderCard from "./ProductOrderCard";
import { formatPrices } from "../../utils";

const OrderCard = () => {
  return (
    <div className="mt-4 rounded-sm border bg-white py-6 px-4">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center">
          <h3>Jerry Shop</h3>
          <Button
            startIcon={AiOutlineShop}
            classNameStarIcon="mr-1"
            className="ml-2 rounded-sm border px-4 py-1 text-[13px] capitalize transition-all hover:opacity-80"
            text="Xem shop"
          />
        </div>
        <div>
          <h4 className="uppercase text-primary">Đang giao</h4>
        </div>
      </div>
      <div className="pt-4">
        <ProductOrderCard />
        <ProductOrderCard />
        <ProductOrderCard />
      </div>
      <div className="flex items-center justify-end">
        <div className="flex items-center">
          <AiOutlineFileProtect className="text-[20px] text-primary" />
          <span className="ml-1 text-[17px]">
            Tổng số tiền:{" "}
            <span className="text-[20px] text-primary">
              {formatPrices(100000)}
            </span>
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end">
        {/* <Button
          text="Mua lại"
          className="flex items-center justify-center rounded-sm bg-primary  px-6 py-2 text-[15px] capitalize text-white hover:opacity-80"
        /> */}
        <Button
          text="Đã nhận hàng"
          className="flex items-center justify-center rounded-sm bg-primary  px-6 py-2 text-[15px] capitalize text-white hover:opacity-80"
        />
        <Button
          text="Yêu cầu trả hàng"
          className="ml-2 flex items-center justify-center rounded-sm border  px-6 py-2 text-[15px] capitalize  hover:opacity-80"
        />
      </div>
    </div>
  );
};

export default OrderCard;
