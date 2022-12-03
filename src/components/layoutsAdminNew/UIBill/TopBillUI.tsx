import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
const TopBillUI = () => {
  return (
    <div className="p-4">
      <div className=" flex items-center justify-end">
        <div className="mr-4">Ngày đặt hàng</div>
        <input className="rounded border py-2 px-1" type="date" />
      </div>
      <div className="my-4 flex items-center justify-between ">
        <div className="flex items-center">
          <select
            name=""
            id=""
            className="h-[35px] rounded-l border-[1px] border-solid border-[#E5E5E5] py-2 px-2 transition-all hover:cursor-pointer hover:border-[#666]"
          >
            <option value="">Mã đơn hàng</option>
            <option value="">Tên tên người mua</option>
            <option value="">Tên sản phẩm</option>
          </select>
          <div className="flex h-[35px] items-center  rounded-r border-y border-r  border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-l hover:border-[#666]">
            <input
              type="text"
              placeholder="Tìm kiếm....."
              className=" w-[600px] border-none outline-none"
            />
            <AiOutlineSearch className=" text-[24px]" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="rounded-[4px] bg-red-500 py-2 px-6 text-[#ffffff] hover:cursor-pointer hover:bg-[rgba(120,21,21,0.66)]">
            Tìm kiếm
          </div>
          <div className="ml-4 rounded-[4px] border-[1px] border-solid border-[#E5E5E5] py-2 px-6 hover:cursor-pointer hover:bg-[#b5b5b580]">
            Nhập lại
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBillUI;
