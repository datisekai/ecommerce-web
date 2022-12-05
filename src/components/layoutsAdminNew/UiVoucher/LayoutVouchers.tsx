import React from "react";
import LayoutContentVouchers from "./LayoutContentVouchers";
import LayoutTopVouchers from "./LayoutTopVouchers";

const LayoutVouchers = () => {
  return (
    <div>
      <div className=" _shadow ml-80 mr-[100px] mt-4 min-w-[900px] rounded-[4px] bg-[#ffffff] ">
        <LayoutTopVouchers />
      </div>
      <div className=" _shadow relative ml-80 mr-[100px] mt-4 mb-20 min-w-[900px] rounded-[4px] bg-[#ffffff] pb-1">
        <LayoutContentVouchers />
      </div>
    </div>
  );
};

export default LayoutVouchers;
