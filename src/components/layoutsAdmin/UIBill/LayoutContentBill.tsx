import React, { useState, FC, useMemo } from "react";
import TableLayout from "../../_custom/TableLayout";
import columnTable, { IDataColumnTable } from "../../data/columnTable";
import rowTables from "../../data/rowTable";
import TopBillUI from "./TopBillUI";
import { Order } from "../../../models/order.model";
import dayjs from "dayjs";

interface LayoutContentBillProps {
  data: Order[];
  handleChange: (value: number) => void;
}

const LayoutContentBill: FC<LayoutContentBillProps> = ({
  data,
  handleChange,
}) => {
  const dataTables = useMemo(() => {
    return (
      data?.map((item) => ({
        id: item.id,
        createdAt: dayjs(item.createdAt).format("DD/MM/YYYY"),
        total: item.total,
        description: item.description || "Không có",
        status: item.status.name,
      })) || []
    );
  }, [data]);

  const col: IDataColumnTable[] = [
    {
      id: "id",
      name: "ID",
    },
    {
      id: "createdAt",
      name: "Ngày tạo",
    },
    {
      id: "total",
      name: "Tổng tiền",
    },
    {
      id: "description",
      name: "Lưu ý",
    },
    {
      id: "status",
      name: "Trạng thái",
    },
    {
      id: "action",
      name: "Thao tác",
    },
  ];

  const [changebottom, setChangeBottom] = useState({
    width: 71,
    transform: "0px",
  });
  const handlechange = (width: number, transform: string) => {
    setChangeBottom({
      width: width,
      transform: transform,
    });
  };
  return (
    <>
      <div className="flex border-b border-[#E5E5E5] ">
        <div
          onClick={() => {
            handlechange(71, "0px");
            handleChange(0);
          }}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Tất cả
        </div>
        <div
          onClick={() => {
            handlechange(120, "71px");
            handleChange(1);
          }}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Chờ xác nhận
        </div>
        <div
          onClick={() => {
            handlechange(113, "193px");
            handleChange(2);
          }}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Đang giao
        </div>
        <div
          onClick={() => {
            handlechange(96, "306px");
            handleChange(3);
          }}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Đã giao
        </div>
        <div
          onClick={() => {
            handlechange(80, "402px");
            handleChange(4);
          }}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Đã hủy
        </div>
        {/* <div
          onClick={() => handlechange(98, "482px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Bị báo cáo
        </div> */}
      </div>
      <div
        className="shopee-tabs__ink-bar h-1  bg-red-500"
        style={{
          width: changebottom.width,
          transform: `translateX(${changebottom.transform})`,
        }}
      ></div>
      {/* ************************************** */}
      <TopBillUI />
      {/* ************************************** */}
      <div className="flex items-center justify-between p-4">
        <div>
          <strong className="text-[18px]">{data?.length || 0} Đơn hàng</strong>
        </div>
        <div className="rounded-[4px] bg-red-500 py-3 px-6 text-[#ffffff] hover:cursor-pointer hover:bg-[rgba(120,21,21,0.66)]">
          Giao hàng loạt
        </div>
      </div>
      {/* ************************************** */}
      <div className="p-4">
        {/* <TableLayout
          columnTable={col}
          rowTables={dataTables}
          isAction={false}
          isUpdate={false}
          isDelete={false}
        /> */}
        <div className=" h-[360px] overflow-x-auto overflow-y-auto rounded-[4px] border-[1px] border-solid border-[#E5E5E5]">
          <table className=" w-[100%] ">
            <thead>
              <tr className=" sticky top-0 z-30 h-10 bg-[#F6F6F6] text-[#999999]">
                {col.map((item: any, index: any) => {
                  return (
                    <th
                      className={` pl-2 text-left`}
                      style={{ width: item?.width || `${100 / col.length}%` }}
                      key={index}
                    >
                      {item.name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="h-80">
              {dataTables.map((item: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className={`${index % 2 != 0 && "bg-[#f6f6f6]"} h-20`}
                    style={{ verticalAlign: "middle" }}
                  >
                    {col.map((element: any, index: number) =>
                      element.id === "name" ? (
                        <td
                          key={index}
                          className={` translate-y-[75%] pl-2 line-clamp-2`}
                        >
                          {item[element.id]}
                        </td>
                      ) : element.id === "action" ? (
                        <td key={index} className={` pl-2`}>
                          <select name="" id="" className="border px-4 py-2">
                            <option value="1">Chờ xác nhận</option>
                            <option value="2">Đã xác nhận</option>
                          </select>
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
      </div>
    </>
  );
};

export default LayoutContentBill;
