import React, { useState } from "react";
import sidebarData from "../data/sidebar";
import ItemMenuLeft from "./ItemMenuLeft";
const MenuLeft = () => {
  return (
    <div className="fixed left-0 top-14 z-50 h-[calc(100vh-56px)] w-[220] overflow-x-hidden overflow-y-hidden bg-[#fff] p-4 hover:overflow-y-auto">
      {sidebarData.map((item: any, index) => {
        return <ItemMenuLeft {...item} key={index} />;
      })}
    </div>
  );
};

export default MenuLeft;
