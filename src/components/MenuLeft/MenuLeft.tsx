import React, { useState } from "react";
import sidebarData from "../data/sidebar";
import ItemMenuLeft from "./ItemMenuLeft";
const MenuLeft = () => {
  return (
    <div className=" fixed left-0 top-14 h-[calc(100vh-56px)] w-[220] overflow-x-hidden overflow-y-hidden bg-[#fff] p-4 hover:overflow-y-auto">
      {sidebarData.map((item: any) => {
        return <ItemMenuLeft {...item} />;
      })}
    </div>
  );
};

export default MenuLeft;
