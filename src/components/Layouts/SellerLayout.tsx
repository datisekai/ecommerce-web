import React from "react";
import HeaderAdmin from "../Headers/HeaderAdmin";
import MenuLeft from "../MenuLeft/MenuLeft";

type SellerLayoutProps = {
  children: React.ReactNode;
};

const SellerLayout: React.FC<SellerLayoutProps> = ({ children }) => {
  return (
    <div className=" bg-[#f6f6f6]">
      <HeaderAdmin />
      <div className="min-h-screen pt-14">
        <MenuLeft />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SellerLayout;
