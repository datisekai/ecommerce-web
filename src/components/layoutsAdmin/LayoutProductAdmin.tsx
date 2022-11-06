import React, { useState } from "react";
import TableLayout from "./TableLayout";
import columnTable from "../data/columnTable";
import LayoutTopProduct from "./LayoutTopProduct";
const LayoutAdmin = () => {
  return (
    <>
      <div className=" _shadow ml-80 mr-[100px] mt-4 min-w-[900px] rounded-[4px] bg-[#ffffff]">
        <LayoutTopProduct />
      </div>
      <div className=" _shadow relative ml-80 mr-[100px] mt-4 mb-20 min-w-[900px] rounded-[4px] bg-[#ffffff] pb-1">
        <TableLayout columnTable={columnTable} />
      </div>
    </>
  );
};

export default LayoutAdmin;
