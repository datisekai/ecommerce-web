import React from "react";

const LayoutTopProduct = () => {
  return (
    <div className="mb-4 flex items-center justify-between  p-4">
      <div>
        <select
          name=""
          id=""
          className="rounded-l border-[1px] border-solid border-[#E5E5E5] py-2 px-2"
        >
          <option value="">ID sản phẩm</option>
          <option value="">Tên sản phẩm</option>
          <option value="">SKU phân loại</option>
        </select>
        <input
          type="text"
          placeholder="Tìm kiếm....."
          className="w-80 rounded-r border-[1px] border-solid border-[#E5E5E5] py-2 px-2"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="rounded-[4px] bg-red-500 py-2 px-6 text-[#ffffff]">
          Tìm
        </div>
        <div className="ml-4 border-[1px] border-solid border-[#E5E5E5] py-2 px-6">
          Nhập lại
        </div>
      </div>
    </div>
  );
};

export default LayoutTopProduct;
