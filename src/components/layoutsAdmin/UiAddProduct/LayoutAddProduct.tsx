import React from "react";
import Thongtinbanhang from "./Thongtinbanhang";
import Thongtincoban from "./Thongtincoban";
const LayoutAddProduct = () => {
  return (
    <div className="bg-[#F6F6F6]">
      <div className=" _shadow relative ml-[320px] mr-[100px] mt-4 mb-6 min-w-[900px] rounded-[4px] bg-[#ffffff] pb-1">
        <Thongtincoban />
      </div>
      <div className=" _shadow relative ml-[320px] mr-[100px] mt-4 mb-6 min-w-[900px] rounded-[4px] bg-[#ffffff] pb-1">
        <Thongtinbanhang />
      </div>
    </div>
  );
};

export default LayoutAddProduct;
