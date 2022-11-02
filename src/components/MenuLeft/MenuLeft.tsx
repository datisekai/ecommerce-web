import React, { useState } from "react";
import sidebarData from "../data/sidebar";
import ItemMenuLeft from "./ItemMenuLeft";
const MenuLeft = () => {
  return (
    <div className=" fixed left-0 top-14 h-[100vh] bg-[#fff] p-2">
      <div className="bg-lime-500">
        {sidebarData.map((item: any) => {
          return <ItemMenuLeft {...item} />;
        })}
      </div>
    </div>
  );
};

export default MenuLeft;
