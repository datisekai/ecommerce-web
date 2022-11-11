import React, { useState } from "react";
import { Danhsachphanloaihang } from "./Danhsachphanloaihang";
const LayoutDanhSachProduct = () => {
  const [textGroupPrices, setTextGroupPrices] = useState("");
  const [textGroupQuantity, setTextGroupQuantity] = useState("");
  const [textGroupSKU, setTextGroupSKU] = useState("");
  return (
    <div className=" _shadow relative ml-[370px] mr-[150px] mt-4 mb-6 min-w-[800px] rounded-[4px] bg-[#ffffff] pb-1">
      <div className="mb-6 flex p-4">
        <div className="w-[160px]">Danh sách phân loại hàng</div>
        <div className="flex h-[35px] w-[180px] items-center  rounded-l border-y border-l border-solid border-[#E5E5E5] py-2 px-2 transition-all hover:border-r hover:border-[#666]">
          <div className="border-r-2 pr-2 text-gray-400">đ</div>
          <input
            type="number"
            placeholder="Giá"
            onChange={(e) => {
              setTextGroupPrices(e.target.value);
            }}
            className="ml-4 w-[130px]  outline-none"
          />
        </div>
        <input
          type="number"
          placeholder="Số lượng"
          onChange={(e) => {
            setTextGroupQuantity(e.target.value);
          }}
          className="flex h-[35px] w-[180px] items-center border-y border-l border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-r hover:border-[#666]"
        />
        <input
          type="text"
          placeholder="SKU phân loại"
          onChange={(e) => {
            setTextGroupSKU(e.target.value);
          }}
          className="flex h-[35px] w-[180px] items-center  rounded-r border-y border-x border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-r hover:border-[#666]"
        />
      </div>
      {/* <Danhsachphanloaihang
        NameNPL1={_textGroup1} Tên thuộc tính 1 vidu: Màu
        NameNPL2={_textGroup2} Tên thuộc tính 2 vidu: Size
        rowNPL1={_group1} các thuộc tính bên trong của thuộc tính 1 vd: đỏ, xanh
        rowNPL2={_group2} các thuộc tính bên trong của thuộc tính 1 vd: M, L
        isADDNPL2={_displayGroupCategory2 == true ? true : false} cột Thuộc tính 2 có hay là không
        textAllPrices={textGroupPrices} cho all giá  (có sẵn)
        textAllQuantity={textGroupQuantity} cho all số lượng (có sẵn)
        textAllSku={textGroupSKU} cho all sku phân loại (có sẵn)
      /> */}
    </div>
  );
};

export default LayoutDanhSachProduct;
