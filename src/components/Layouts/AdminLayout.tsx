import React from "react";
import HeaderAdmin from "../Headers/HeaderAdmin";
import MenuLeftAdmin from "../MenuleftAdmin/MenuLeftAdmin";
type AdminLayoutProps = {
  children: React.ReactNode;
};
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className=" bg-[#f6f6f6]">
      <HeaderAdmin name={"ADMIN"} isSeller={false} />
      <div className="min-h-screen pt-14">
        <MenuLeftAdmin />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
