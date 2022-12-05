import React, { useState } from "react";

const LayoutPermission = () => {
  const [checkedBoxAll, setCCheckedBoxAll] = useState(false);
  const listPermission = [
    {
      name: "Quản lý đơn hàng",
      privilege: ["them", "sua", "xoa"],
    },
    {
      name: "Quản lý người dùng",
      privilege: ["them", "sua", "xoa"],
    },
    {
      name: "Quản lý mã giảm giá",
      privilege: ["them", "sua", "xoa"],
    },
    {
      name: "Quản lý sản phẩm",
      privilege: ["them", "sua", "xoa"],
    },
    {
      name: "Quản lý ngành hàng",
      privilege: ["them", "sua", "xoa"],
    },
    {
      name: "Thống kê",
      privilege: ["xem"],
    },
    {
      name: "Quản lý nhóm quyền",
      privilege: ["xem", "sua", "xoa"],
    },
  ];
  return (
    <div className=" _shadow relative ml-80 mr-[100px] mt-4 min-w-[900px] rounded-[4px] bg-[#ffffff] pb-1">
      <div className="mb-4 flex items-center justify-between  p-4">
        <div className="flex items-center">
          <select
            name=""
            id=""
            className="h-[35px] rounded-l border-[1px] border-solid border-[#E5E5E5] py-2 px-2 transition-all hover:cursor-pointer hover:border-[#666]"
          >
            <option value="">admin quản lý đơn hàng</option>
            <option value="">admin quản lý sản phẩm</option>
          </select>
          <div
            className="h-[35px]
            cursor-pointer rounded-r border-y border-r border-solid border-[#E5E5E5] py-2 px-2 hover:bg-hoverBgSec"
          >
            Thêm nhóm quyền
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div
            onClick={() => setCCheckedBoxAll(true)}
            className="rounded-[4px] bg-red-500 py-2 px-6 text-[#ffffff] hover:cursor-pointer hover:bg-[rgba(120,21,21,0.66)]"
          >
            Chọn tất cả
          </div>
          <div
            onClick={() => setCCheckedBoxAll(false)}
            className="ml-4 rounded-[4px] border-[1px] border-solid border-[#E5E5E5] py-2 px-6 hover:cursor-pointer hover:bg-[#b5b5b580]"
          >
            Bỏ chọn tất cả
          </div>
        </div>
      </div>
      {/* ************************************** */}
      <div className="mx-4">
        <div className="grid grid-cols-3">
          {listPermission.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="mx-4 mb-8 h-[280px] overflow-x-hidden overflow-y-hidden border hover:overflow-y-auto"
              >
                <div className="flex justify-center p-2 text-lg">
                  <strong> {item.name}</strong>
                </div>
                <div className="mx-4 mt-4">
                  {item.privilege.map((item1: any, index: number) => {
                    return (
                      <div key={index} className="mb-2 flex py-2 pl-4 ">
                        <input
                          type="checkbox"
                          name=""
                          checked={checkedBoxAll ? true : false}
                          id={`${item.name + item1}`}
                        />
                        <label
                          className="ml-2 text-base"
                          htmlFor={`${item.name + item1}`}
                        >
                          {item1}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* ************************************** */}
      <div className="flex justify-end py-4 pr-10">
        <div className="rounded-[4px] bg-red-500 py-2 px-6 text-[#ffffff] hover:cursor-pointer hover:bg-[rgba(120,21,21,0.66)]">
          Submit
        </div>
      </div>
    </div>
  );
};

export default LayoutPermission;
