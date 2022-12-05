import React from "react";
type AdminLayoutProps = {
  children: React.ReactNode;
};
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className=" bg-[#f6f6f6]">
      {/* <HeaderAdmin />
      <div className="min-h-screen pt-14">
        <MenuLeft />
        <div>{children}</div>
      </div> */}
    </div>
  );
};

export default AdminLayout;
