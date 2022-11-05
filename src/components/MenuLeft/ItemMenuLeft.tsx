import React, { useState } from "react";
import { ISidebarData } from "../data/sidebar";
import { SlArrowDown } from "react-icons/sl";
import itemSidebarData from "../data/itemSlideBar";
import { IItemSidebarData } from "../data/itemSlideBar";
const ItemMenuLeft = ({ id, name, icon }: ISidebarData) => {
  const Icon = icon;
  const [isHover, setIsHover] = useState(false);
  const [_display, setDisplay] = useState(false);
  const handleShowItem = () => {
    _display === false ? setDisplay(true) : setDisplay(false);
  };
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
            id="icon_up"
            className={`ml-4 text-[16px] ${isHover && "text-red-500"} `}
          />
        ) : (
          <SlArrowDown
            id="icon_down"
            className={`ml-4 text-[16px] ${isHover && "text-red-500"} `}
          />
        )}
      </div>
      {itemSidebarData.map((item) => {
        if (item.idSlideBar === id)
          return (
            _display && (
              <div
                className={`text-xm ml-6 py-1 text-[#333333] hover:cursor-pointer hover:text-red-500`}
              >
                {item.name}
              </div>
            )
          );
        return;
      })}
    </div>
  );
};

export default ItemMenuLeft;
