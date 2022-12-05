import React from "react";
import TableLayout from "../../_custom/TableLayout";

const LayoutAddPermission = () => {
  const columnTable = [
    { id: "id", name: "ID", width: "75px" },
    { id: "name", name: "Tên nhóm quyền", width: "75px" },
  ];
  const rowTables = [
    { id: "1", name: "Admin abc" },
    { id: "2", name: "Admin abcasd" },
  ];
  return (
    <div className="_shadow ml-80 mr-[100px] mt-4 min-w-[900px] rounded-[4px] bg-[#ffffff] p-4">
      <div className="flex justify-center">
        <strong className="text-lg">Thêm loại người dùng</strong>
      </div>
      <div className="my-4">
        <div className="flex items-center">
          <div className="mr-4">Tên nhóm quyền</div>
          <input
            type="text"
            className="w-[300px] rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2"
          />
        </div>
        <div className="flex pt-4">
          <div className=" ml-[120px] cursor-pointer rounded-[4px] bg-primary py-2 px-4 text-[#fff] hover:bg-hoverBgPri">
            Thêm
          </div>
        </div>
      </div>
      {/***************** */}
      <div className="border-t-2">
        <div className="py-4">
          <strong className="text-base">Danh sách người dùng</strong>
        </div>
        <TableLayout
          columnTable={columnTable}
          rowTables={rowTables}
          isAction={true}
          isUpdate={true}
          isDelete={true}
        />
      </div>
      {/***************** */}
    </div>
  );
};

export default LayoutAddPermission;
