import React from "react";
import HeaderAdmin from "../../components/Headers/HeaderAdmin";
import MenuLeft from "../../components/MenuLeft/MenuLeft";
import LayoutAdmin from "../../components/layoutsAdmin/LayoutProductAdmin";
const Admin = () => {
  return (
    <div className=" bg-[#f6f6f6]">
      <HeaderAdmin />
      <div className="min-h-screen pt-14">
        <MenuLeft />
        <LayoutAdmin />
      </div>
    </div>
  );
};

export default Admin;
