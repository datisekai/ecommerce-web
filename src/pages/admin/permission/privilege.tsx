import React from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import LayoutPermission from "../../../components/layoutsAdminNew/UIPermission/LayoutPermission";
const privilege = () => {
  return (
    <AdminLayout>
      <LayoutPermission />
    </AdminLayout>
  );
};

export default privilege;
