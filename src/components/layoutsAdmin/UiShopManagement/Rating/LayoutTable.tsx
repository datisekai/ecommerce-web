import React, { useState } from "react";
import TableLayout from "../../../_custom/TableLayout";
import dataColumn from "./dataColumnRating";
const LayoutTable = () => {
  const arr = [
    {
      id: "1",
      ProductInformation: "abc",
      comment: "xau",
    },
    {
      id: "2",
      ProductInformation: "abc",
      comment: "dep",
    },
  ];
  const [activeColor, setActiveColor] = useState(0);
  return (
    <div className="">
      <div className="flex border-t px-4 pt-4">
        <div
          onClick={() => setActiveColor(0)}
          className={`rounded-l border-y py-2 px-4 hover:cursor-pointer hover:text-primary ${
            activeColor == 0 && `border border-primary text-primary`
          }`}
        >
          Tất cả
        </div>
        <div
          onClick={() => setActiveColor(1)}
          className={`border-y border-l py-2 px-4 hover:cursor-pointer hover:text-primary ${
            activeColor == 1 && `border border-primary text-primary`
          }`}
        >
          5 Sao
        </div>
        <div
          onClick={() => setActiveColor(2)}
          className={`border-y border-l py-2 px-4 hover:cursor-pointer hover:text-primary ${
            activeColor == 2 && `border border-primary text-primary`
          }`}
        >
          4 Sao
        </div>
        <div
          onClick={() => setActiveColor(3)}
          className={`border-y border-l py-2 px-4 hover:cursor-pointer hover:text-primary ${
            activeColor == 3 && `border border-primary text-primary`
          }`}
        >
          3 Sao
        </div>
        <div
          onClick={() => setActiveColor(4)}
          className={`border-y border-l py-2 px-4 hover:cursor-pointer hover:text-primary ${
            activeColor == 4 && `border border-primary text-primary`
          }`}
        >
          2 Sao
        </div>
        <div
          onClick={() => setActiveColor(5)}
          className={`rounded-r border py-2 px-4 hover:cursor-pointer hover:text-primary ${
            activeColor == 5 && `border border-primary text-primary`
          }`}
        >
          1 Sao
        </div>
      </div>
      <div className="p-4">
        <TableLayout
          columnTable={dataColumn}
          rowTables={arr}
          isAction={false}
          isDelete={false}
          isUpdate={false}
        />
      </div>
    </div>
  );
};

export default LayoutTable;
