import React from "react";
import TableLayout from "../../_custom/TableLayout";

const LayoutContentVouchers = () => {
  const columnTable = [
    {
      id: "id",
      name: "ID",
      width: "100px",
    },
    {
      id: "tengia",
      name: "Tên giá",
      width: "75px",
    },
    {
      id: "phantramgiam",
      name: "Phần trăm giá",
      width: "75px",
    },
    {
      id: "giatoithieu",
      name: "Giá tối thiểu",
      width: "75px",
    },
  ];
  const rowTables = [
    {
      id: "1",
      tengia: "lễ hội 1",
      phantramgiam: "10%",
      giatoithieu: "100000",
    },
    {
      id: "2",
      tengia: "lễ hội 2",
      phantramgiam: "10%",
      giatoithieu: "200000",
    },
    {
      id: "3",
      tengia: "lễ hội3",
      phantramgiam: "20%",
      giatoithieu: "100000",
    },
    {
      id: "4",
      tengia: "lễ hội 4",
      phantramgiam: "10%",
      giatoithieu: "400000",
    },
  ];
  return (
    <div className="mx-4">
      <div className="flex items-center justify-between pt-2">
        <div className="py-2">
          <strong className="text-lg">Danh sách mã giảm giá</strong>
        </div>
        <div className=" cursor-pointer rounded-[4px] bg-primary py-2 px-2 hover:bg-hoverBgPri">
          Tạo mã giảm giá
        </div>
      </div>
      <TableLayout
        columnTable={columnTable}
        rowTables={rowTables}
        isAction={true}
        isUpdate={true}
        isDelete={true}
      />
    </div>
  );
};

export default LayoutContentVouchers;
