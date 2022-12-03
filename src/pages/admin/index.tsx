import React from "react";
import HeaderAdmin from "../../components/Headers/HeaderAdmin";
import MenuLeft from "../../components/MenuLeft/MenuLeft";
import LayoutProductAdmin from "../../components/layoutsAdmin/UIProduct/LayoutProductAdmin";
import LayoutBill from "../../components/layoutsAdmin/UIBill/LayoutBill";
import SellerLayout from "../../components/Layouts/SellerLayout";
import AdminLayout from "../../components/Layouts/AdminLayout";
const AllBill = () => {
  return (
    <AdminLayout>
      <LayoutBill />
    </AdminLayout>
  );
};

export default AllBill;
