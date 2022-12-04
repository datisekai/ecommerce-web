import React, { useState } from "react";
import TableLayout from "../../_custom/TableLayout";
import columnTable from "../../data/columnTable";
import rowTables from "../../data/rowTable";
import TopBillUI from "./TopBillUI";
const LayoutContentBill = () => {
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
          onClick={() => handlechange(120, "71px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Chờ xác nhận
        </div>
        <div
          onClick={() => handlechange(113, "193px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Chờ lấy hàng
        </div>
        <div
          onClick={() => handlechange(96, "306px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Đang giao
        </div>
        <div
          onClick={() => handlechange(80, "402px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Đã giao
        </div>
        <div
          onClick={() => handlechange(98, "482px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Bị báo cáo
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
      <TopBillUI />
      {/* ************************************** */}
      <div className="flex items-center justify-between p-4">
        <div>
          <strong className="text-[18px]">0 Đơn hàng</strong>
        </div>
        <div className="rounded-[4px] bg-red-500 py-3 px-6 text-[#ffffff] hover:cursor-pointer hover:bg-[rgba(120,21,21,0.66)]">
          Giao hàng loạt
        </div>
      </div>
      {/* ************************************** */}
      <div className="p-4">
        <TableLayout
          columnTable={columnTable}
          rowTables={rowTables}
          isAction={false}
          isUpdate={false}
          isDelete={false}
        />
      </div>
    </>
  );
};

export default LayoutContentBill;
