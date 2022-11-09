import React from "react";
import { BsPencil } from "react-icons/bs";

const Thongtincoban = () => {
  return (
    <div className="p-4">
      <div className="mb-6 text-xl">
        <strong>Thông tin cơ bản</strong>
      </div>
      <div className="ml-6">
        <div className=" mb-6 flex ">
          <div className="w-[160px]">Hình ảnh sản phẩm</div>
          <input type="file" name="" id="" className="" />
        </div>
        <div className="mb-6 flex items-center">
          <div className="w-[160px]">Tên sản phẩm</div>
          <div className="flex h-[40px] w-[620px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-l hover:border-[#666]">
            <input
              type="text"
              placeholder="Nhập vào"
              className=" w-[600px] border-none outline-none"
            />
            {/* <BsPencil className=" text-[16px]" /> */}
          </div>
        </div>
        <div className="mb-6 flex items-center">
          <div className="w-[160px]">Ngành hàng</div>
          <div className="flex h-[40px] w-[620px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-l hover:border-[#666]">
            <input
              type="text"
              placeholder="Chọn tên ngành hàng"
              className=" w-[600px] border-none outline-none"
            />
            <BsPencil className=" text-[16px]" />
          </div>
        </div>
        <div className="mb-6 flex ">
          <div className="w-[160px]">Mô tả sản phẩm</div>
          <textarea className="h-[200px] w-[620px] resize-none rounded-[4px] border p-2"></textarea>
        </div>
      </div>
    </div>
  );
};

export default Thongtincoban;
