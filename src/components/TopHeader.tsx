import React from "react";
import { RiFacebookCircleLine } from "react-icons/ri";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsBell, BsChevronDown } from "react-icons/bs";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import Link from "next/link";

const TopHeader = () => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <a
          href="#"
          className="mr-2 text-[15px]  capitalize  text-white hover:opacity-80"
        >
          Kênh người bán
        </a>
        <div className="divider relative ml-2 mr-2">
          <a href="#" className=" ml-2 text-[15px] text-white hover:opacity-80">
            Trở thành Người bán Shopee
          </a>
        </div>

        <div className="divider relative ml-2 flex items-center text-white">
          <span className="ml-2 text-[15px] text-white">Kết nối</span>
          <RiFacebookCircleLine className="ml-1 text-[20px] transition-all hover:cursor-pointer hover:opacity-80" />
          <AiOutlineInstagram className="ml-1 text-[20px] transition-all hover:cursor-pointer hover:opacity-80" />
        </div>
      </div>
      <div className="relative flex items-center">
        <div className="relative">
          <div className="showNotification flex items-center text-white ">
            <BsBell className="text-[20px]" />
            <span className="ml-1 text-[15px] capitalize">Thông báo</span>
            <div className="square-divider menuNotify shadowBox absolute right-0 top-[30px] z-10 flex hidden h-[300px] w-[500px] flex-col items-center justify-center rounded-sm bg-white p-4">
              <img
                width={120}
                height={120}
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/99e561e3944805a023e87a81d4869600.png"
                alt=""
              />
              <span className="mt-2 text-center text-[15px] text-slate-600">
                Đăng nhập để xem Thông Báo
              </span>
            </div>
          </div>
        </div>
        <div className="ml-3 flex items-center text-white hover:cursor-pointer hover:opacity-80">
          <IoIosHelpCircleOutline className="text-[20px]" />
          <span className="ml-1 text-[15px] capitalize">Hỗ trợ</span>
        </div>
        <div className="showLanguage relative ml-3 flex items-center text-white hover:cursor-pointer">
          <MdLanguage className="text-[20px]" />
          <span className="ml-1 text-[15px] capitalize">Tiếng việt</span>
          <BsChevronDown className="ml-1 text-[18px]" />
          <div className="square-divider menuLanguage shadowBox absolute right-0 top-[30px] z-10 hidden w-[200px] rounded-sm bg-white px-2 py-2">
            <h3 className="py-1 text-[15px] capitalize text-black transition-all hover:text-primary">
              Tiếng việt
            </h3>
            <h3 className="py-1 text-[15px] capitalize text-black transition-all hover:text-primary">
              English
            </h3>
          </div>
        </div>
        <div className="ml-3 flex items-center">
          <Link href={"/sign-up"}>
            <button className="mr-2 capitalize text-white hover:opacity-80">
              Đăng ký
            </button>
          </Link>
          <div className="divider relative ml-2">
            <Link href={"/login"}>
              <button className="ml-2 capitalize text-white hover:opacity-80">
                Đăng nhập
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
