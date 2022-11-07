import React, { useState } from "react";
import TableLayout from "./TableLayout";
import columnTable from "../data/columnTable";
import rowTables from "../data/rowTable";
const LayoutContentProduct = () => {
  const [changebottom, setChangeBottom] = useState({
    width: 71,
    transform: "0px",
  });
  const handlechange = (width: number, transform: string) => {
    setChangeBottom({
      width: width,
      transform: transform,
    });
  };
  return (
    <>
      <div className="flex border-b border-[#E5E5E5] ">
        <div
          onClick={() => handlechange(71, "0px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Tất cả
        </div>
        <div
          onClick={() => handlechange(130, "71px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Đang hoạt động
        </div>
        <div
          onClick={() => handlechange(88, "203px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Hết hàng
        </div>
        <div
          onClick={() => handlechange(85, "291px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Vi Phạm
        </div>
        <div
          onClick={() => handlechange(69, "376px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Đã ẩn
        </div>
      </div>
      <div
        className="shopee-tabs__ink-bar h-1  bg-red-500"
        style={{
          width: changebottom.width,
          transform: `translateX(${changebottom.transform})`,
        }}
      ></div>
      {/* ************************************** */}
      <div className="flex items-center justify-between p-4">
        <div>
          <strong className="text-[18px]">0 Sản phẩm</strong>
        </div>
        <div className="rounded-[4px] bg-red-500 py-3 px-6 text-[#ffffff] hover:cursor-pointer hover:bg-[rgba(120,21,21,0.66)]">
          Thêm 1 sản phẩm
        </div>
      </div>
      {/* ************************************** */}
      <TableLayout columnTable={columnTable} rowTables={rowTables} />
    </>
  );
};

export default LayoutContentProduct;
