import React from "react";

const LayoutTopVouchers = () => {
  return (
    <div className="mb-4 flex items-center justify-between  p-4">
      <div className="flex items-center">
        <select
          name=""
          id=""
          className="h-[35px] rounded-l border-[1px] border-solid border-[#E5E5E5] py-2 px-2 transition-all hover:cursor-pointer hover:border-[#666]"
        >
          <option value="">ID mã giảm</option>
          <option value="">Tên mã giảm</option>
        </select>
        <input
          type="text"
          placeholder="Tìm kiếm....."
          className="h-[35px] w-80  rounded-r border-y border-r  border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-l hover:border-[#666]"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="rounded-[4px] bg-red-500 py-2 px-6 text-[#ffffff] hover:cursor-pointer hover:bg-[rgba(120,21,21,0.66)]">
          Tìm
        </div>
        <div className="ml-4 rounded-[4px] border-[1px] border-solid border-[#E5E5E5] py-2 px-6 hover:cursor-pointer hover:bg-[#b5b5b580]">
          Nhập lại
        </div>
      </div>
    </div>
  );
};

export default LayoutTopVouchers;
