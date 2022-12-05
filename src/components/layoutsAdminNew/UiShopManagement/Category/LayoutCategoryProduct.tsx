import React, { useState } from "react";
import TableLayout from "../../../_custom/TableLayout";
import dataColumn from "./dataColumnCategory";
import dataRow from "./dataRow";
import ModalPopUp from "../../../_custom/ModalPopUp";
const LayoutCategoryProduct = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  return (
    <div className=" _shadow ml-80 mr-[100px] mt-4 min-w-[900px] rounded-[4px] bg-[#ffffff] p-4">
      <div className="flex items-center justify-between p-4 ">
        <div>
          <strong className="text-lg">Danh mục của shop</strong>
        </div>
        <div className="rounded-[4px] bg-primary py-2 px-4 text-[#fff] hover:cursor-pointer hover:bg-[#7a060672]">
          Thêm danh mục mới
        </div>
      </div>
      <TableLayout
        columnTable={dataColumn}
        rowTables={dataRow}
        isAction={true}
        isDelete={true}
        isUpdate={true}
      />
      <ModalPopUp display={modalDisplay} title="Sửa danh mục" />
    </div>
  );
};

export default LayoutCategoryProduct;
