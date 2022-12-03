import React from "react";

const LayoutAddVouchers = () => {
  return (
    <div className=" _shadow ml-80 mr-[100px] mt-4 min-w-[900px] rounded-[4px] bg-[#ffffff] ">
      <div className="px-4">
        <strong className="text-lg">Thông tin cơ bản mã giảm giá</strong>
        <div className="bg-red-500">
          <div className="flex items-center justify-around">
            <div>Tên mã giảm giá</div>
            <input type="text" />
          </div>
          <div className="flex items-center justify-around">
            <div>% giảm</div>
            <input type="text" />
          </div>
          <div className="flex items-center justify-around">
            <div>Giá đơn tối thiểu</div>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAddVouchers;
