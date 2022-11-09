import React, { useState } from "react";
import { ISidebarData } from "../data/sidebar";
import { SlArrowDown } from "react-icons/sl";
import itemSidebarData from "../data/itemSlideBar";
import { useRouter } from "next/router";
import Link from "next/link";
const ItemMenuLeft = ({ id, name, icon }: ISidebarData) => {
  const Icon = icon;
  const [isHover, setIsHover] = useState(false);
  const [_display, setDisplay] = useState(false);
  const handleShowItem = () => {
    _display === false ? setDisplay(true) : setDisplay(false);
  };

  const router = useRouter();

  return (
    <div className="mb-4">
      <div
        className=" flex cursor-pointer items-center py-2 text-[#999999] "
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => handleShowItem()}
      >
        <Icon className="mr-2 text-[16px] " />
        <span className={`flex-1 text-sm `}>{name}</span>
        {_display ? (
          <SlArrowDown
            className={`icon_up ml-4 text-[16px] ${isHover && "text-red-500"} `}
          />
        ) : (
          <SlArrowDown
            className={`icon_down ml-4 text-[16px] ${
              isHover && "text-red-500"
            }`}
          />
        )}
      </div>
      {itemSidebarData.map((item, index) => {
        if (item.idSlideBar === id)
          return (
            _display && (
              <Link href={item.url} key={index}>
                <div
                  className={`text-xm ml-6 py-1  hover:cursor-pointer hover:text-red-500 ${
                    router.asPath === item.url
                      ? "text-primary"
                      : "text-[#333333]"
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            )
          );
        return;
      })}
    </div>
  );
};

export default ItemMenuLeft;
