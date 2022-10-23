import React from "react";
import { CiSearch } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

const HeaderMobile = () => {
  return (
    <div className="max-w-[calc(100% - 16px)] fixed top-0 right-0 left-0 z-[100] block w-full bg-transparent py-2 lg:hidden">
      <div className="flex items-center px-2">
        <div className="flex flex-1 items-center rounded-sm bg-white">
          <CiSearch className="ml-2  text-[20px] text-gray-500" />
          <input
            type="text"
            placeholder="Đăng ký và nhận voucher bạn nhé"
            className="h-[2.25rem] w-full rounded-sm border-none px-[0.5rem] text-black outline-none placeholder:text-[14px] placeholder:text-red-500"
          />
        </div>
        <div className="ml-2 flex items-center">
          <BsCart2 className="ml-2 mr-2 text-[24px] text-white" />
          <FaRegUser className="ml-2 mr-2 text-[22px] text-white" />
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
