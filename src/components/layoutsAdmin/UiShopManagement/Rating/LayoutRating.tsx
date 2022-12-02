import React from "react";
import LayoutTable from "./LayoutTable";
const LayoutRating = () => {
  return (
    <div className=" _shadow ml-80 mr-[100px] mt-4 min-w-[900px] rounded-[4px] bg-[#ffffff] ">
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <div className="text-xl ">
            <strong>Đánh giá shop</strong>
          </div>
          <div className="text-xs text-[#555555]">
            Xem đánh giá shop của bạn
          </div>
        </div>
        <div>
          <span className="text-3xl text-primary">0.0</span>
          <span className="text-[#555555]"> /5</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap">
          <div className="my-3 mr-10 flex w-[320px] items-center">
            <div className="mr-2 w-[100px]">Tên sản phẩm: </div>
            <div>
              <input
                type="text"
                placeholder="Nhập tên sản phẩm"
                className="w-[200px] rounded border p-2"
              />
            </div>
          </div>
          <div className="my-3 mr-10 flex w-[320px] items-center">
            <div className="mr-2 w-[100px]">Phân loại hàng: </div>
            <div>
              <input
                type="text"
                placeholder="Nhập tên phân loại hàng"
                className="w-[200px] rounded border p-2"
              />
            </div>
          </div>
          <div className="my-3 mr-10 flex w-[320px] items-center">
            <div className="mr-2 w-[80px]">Người mua: </div>
            <div>
              <input
                type="text"
                placeholder="Nhập tên đăng nhập"
                className="w-[200px] rounded border p-2"
              />
            </div>
          </div>
          <div className="my-3 mr-10 flex w-[320px] items-center">
            <div className="mr-2 w-[100px]">Thời gian đánh giá: </div>
            <div>
              <input
                type="date"
                placeholder="Nhập tên sản phẩm"
                className="w-[200px] rounded border p-2"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="rounded border bg-primary py-2 px-6 text-[#fff] hover:cursor-pointer hover:bg-hoverBgPri">
            Tìm
          </div>
          <div className="ml-4 rounded border py-2 px-6 hover:cursor-pointer hover:bg-hoverBgSec">
            Nhập lại
          </div>
        </div>
      </div>
      <LayoutTable />
    </div>
  );
};

export default LayoutRating;
