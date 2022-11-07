import React from "react";

const TableLayout = (props: any) => {
  const renderItem = (item: any) => {
    let html = "";
    for (var key in item) {
      props.columnTable.forEach((element: any, indexElement: number) => {
        if (element.id == key) {
          html += `  <td className="pl-2">
            ${item[element.id]}
          </td>`;
        }
      });
    }
    return html;
  };
  return (
    <div className=" m-4 h-[360px] overflow-x-auto overflow-y-auto rounded-[4px] border-[1px] border-solid border-[#E5E5E5]">
      <table className=" w-[100%] ">
        <thead>
          <tr className=" sticky top-0 h-10 bg-[#F6F6F6] text-[#999999]">
            {props.columnTable.map((item: any, index: any) => {
              return (
                <th className={`w-[${item.width}]`} key={index}>
                  {item.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="h-80">
          {props.rowTables.map((item: any, index: number) => {
            if (index % 2 == 0) {
              return (
                <tr
                  key={index}
                  className="h-20 "
                  dangerouslySetInnerHTML={{ __html: renderItem(item) }}
                ></tr>
              );
            } else {
              return (
                <tr
                  className="h-20 bg-[#F6F6F6]"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: renderItem(item) }}
                ></tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableLayout;
