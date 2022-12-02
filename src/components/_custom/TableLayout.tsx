import React from "react";
import ButtonActionDelete from "./ButtonActionDelete";
import ButtonActionUpdate from "./ButtonActionUpdate";
import { IDataColumnTable } from "../data/columnTable";
import { IDataRowTable } from "../data/rowTable";
type TableProps = {
  columnTable: IDataColumnTable[];
  rowTables: object[];
  isAction: true | false;
  isUpdate: true | false;
  isDelete: true | false;
};
const TableLayout: React.FC<TableProps> = ({
  columnTable,
  rowTables,
  isAction,
  isUpdate,
  isDelete,
}) => {
  return (
    <div className=" h-[360px] overflow-x-auto overflow-y-auto rounded-[4px] border-[1px] border-solid border-[#E5E5E5]">
      <table className=" w-[100%] ">
        <thead>
          <tr className=" sticky top-0 h-10 bg-[#F6F6F6] text-[#999999]">
            {columnTable.map((item: any, index: any) => {
              if (isAction == true) {
                return (
                  <th className={`w-[200px] pl-2 text-left`} key={index}>
                    Thao tác
                  </th>
                );
              } else {
                return (
                  <th
                    className={`w-[${item.width}] pl-2 text-left`}
                    key={index}
                  >
                    {item.name}
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody className="h-80">
          {rowTables.map((item: any, index: number) => {
            return (
              <tr
                key={index}
                className={`${index % 2 != 0 && "bg-[#f6f6f6]"} h-20`}
              >
                {columnTable.map((element: any, index: number) =>
                  element.id === "Action" ? (
                    <td className="pl-2" key={index}>
                      <div className="flex items-center">
                        {isUpdate && isAction && (
                          <ButtonActionUpdate
                            onClick={item[element.id].handleUpdate}
                          />
                        )}
                        {isDelete && isAction && (
                          <ButtonActionDelete
                            onClick={item[element.id].handleDelete}
                          />
                        )}
                      </div>
                    </td>
                  ) : (
                    <td key={index} className={` pl-2`}>
                      {item[element.id]}
                    </td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableLayout;
