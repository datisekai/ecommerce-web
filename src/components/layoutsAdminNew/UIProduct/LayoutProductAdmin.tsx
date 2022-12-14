import React, { useState } from "react";
import LayoutContentProduct from "./LayoutContentProduct";
import LayoutTopProduct from "./LayoutTopProduct";
const LayoutProductAdmin = () => {
  return (
    <>
      <div className=" _shadow ml-80 mr-[100px] mt-4 min-w-[900px] rounded-[4px] bg-[#ffffff]">
        <LayoutTopProduct />
      </div>
      <div className=" _shadow relative ml-80 mr-[100px] mt-4 mb-20 min-w-[900px] rounded-[4px] bg-[#ffffff] pb-1">
        <LayoutContentProduct />
      </div>
    </>
  );
};

export default LayoutProductAdmin;
