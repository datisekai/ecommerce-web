import React, { useState } from "react";
import sidebarDataAdmin from "../dataAdmin/sidebar";
import ItemMenuLeftAdmin from "./ItemMenuLeftAdmin";
const MenuLeftAdmin = () => {
  return (
    <div className="fixed left-0 top-14 z-50 h-[calc(100vh-56px)] w-[220] overflow-x-hidden overflow-y-hidden bg-[#fff] p-4 hover:overflow-y-auto">
      {sidebarDataAdmin.map((item: any, index) => {
        return <ItemMenuLeftAdmin {...item} key={index} />;
      })}
    </div>
  );
};

export default MenuLeftAdmin;
