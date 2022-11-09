import React from "react";

const Thongtinbanhang = () => {
  return (
    <div className=" p-4">
      <div className="mb-6 text-xl">
        <strong>Thông tin bán hàng</strong>
      </div>
      <div className="ml-6">
        <div className=" mb-6 flex items-center">
          <div className="w-[160px]">Phân loại hàng</div>
          <div className="rounded-[4px] border-[2px] border-dashed border-[#30303037] py-3 px-6 text-primary hover:cursor-pointer hover:bg-[rgba(255,112,112,0.58)]">
            Thêm nhóm phân loại
          </div>
        </div>
        <div className="mb-6 flex items-center">
          <div className="w-[160px]">Tên sản phẩm</div>
          <div className="flex h-[40px] w-[620px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-l hover:border-[#666]">
            <div className="border-r-2 pr-2 text-gray-400">đ</div>
            <input
              type="text"
              placeholder="Nhập vào"
              className="ml-4 w-[600px] border-none outline-none"
            />
            {/* <BsPencil className=" text-[16px]" /> */}
          </div>
        </div>
        <div className="mb-6 flex items-center">
          <div className="w-[160px]">Số lượng</div>
          <div className="flex h-[40px] w-[620px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-l hover:border-[#666]">
            <input
              type="text"
              placeholder="Nhập vào"
              defaultValue={0}
              className=" w-[600px] border-none outline-none"
            />
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

export default Thongtinbanhang;
