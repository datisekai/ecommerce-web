import React, { useState } from "react";
import rowTables from "../data/rowTable";
const TableLayout = (props: any) => {
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
      <div className="flex items-center justify-between  p-4">
        <div>
          <strong className="text-[18px]">0 Sản phẩm</strong>
        </div>
        <div className="rounded-[4px] bg-red-500 py-3 px-6 text-[#ffffff]">
          Thêm 1 sản phẩm
        </div>
      </div>
      {/* ************************************** */}

      <div className="m-4 h-[360px] overflow-x-auto overflow-y-auto rounded-[4px] border-[1px] border-solid border-[#E5E5E5]">
        <table className=" w-[100%]">
          <thead>
            <tr className="h-10 bg-[#F6F6F6] text-[#999999]">
              {/* {props.columnTable.map((item: any, index: any) => {
                return (
                  <th className="w-auto" key={index}>
                    {item}
                  </th>
                );
              })} */}
              <th className="w-[100px]">{props.columnTable[0]}</th>
              <th className="w-[200px]">{props.columnTable[1]}</th>
              <th className="w-[100px]">{props.columnTable[2]}</th>
              <th className="w-[100px]">{props.columnTable[3]}</th>
              <th className="w-[200px]">{props.columnTable[4]}</th>
              <th className="w-[200px]">{props.columnTable[5]}</th>
            </tr>
          </thead>
          <tbody className="h-80">
            {rowTables.map((item, index) => {
              if (index % 2 == 0) {
                return (
                  <tr key={index} className=" h-20 ">
                    <td className="pl-2">{item.id}</td>
                    <td className="pl-2">{item.name}</td>
                    <td className="pl-2">{item.sku}</td>
                    <td className="pl-2">{item.gia}</td>
                    <td className="pl-2">{item.soluong}</td>
                    <td className="pl-2">{item.thaotac}</td>
                  </tr>
                );
              } else {
                return (
                  <tr className="h-20 bg-[#F6F6F6]" key={index}>
                    <td className="pl-2">{item.id}</td>
                    <td className="pl-2">{item.name}</td>
                    <td className="pl-2">{item.sku}</td>
                    <td className="pl-2">{item.gia}</td>
                    <td className="pl-2">{item.soluong}</td>
                    <td className="pl-2">{item.thaotac}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableLayout;
