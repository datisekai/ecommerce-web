import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../Button";
import { AiOutlineShop } from "react-icons/ai";
import Divider from "../Divider";
import { Seller } from "../../models/product.model";
import Link from "next/link";
import { calculateCreatedTime } from "../../utils/formatTime";
import { createAvatar, formatPrices1 } from "../../utils";
import dayjs from 'dayjs'

const ShopCard:FC<Seller> = ({email,id,image,name,date,nameShop,createdAt,qty = 0, qtyComment}) => {
  return (
    <div className="flex flex-col items-center justify-between rounded-sm bg-white p-4 shadow-sm lg:flex-row">
      <div className="flex items-center ">
        <LazyLoadImage
          src={image ? image : createAvatar(nameShop || name || email || id  )
           }
          className="h-[78px] w-[78px] rounded-full"
        />
        <div className="ml-4">
          <h4 className="text-[17px]">{nameShop || name || email || id}</h4>
          <Link href={`/shop/${id}`}>
          <Button
            startIcon={AiOutlineShop}
            classNameStarIcon={"mr-2"}
            className="mt-4 border px-4 py-2 transition-all hover:border-primary"
            text="Xem Shop"
          /></Link>
        </div>
      </div>
      <div className="hidden lg:block">
        <Divider width="1px" height="50px" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 lg:mt-0">
        <div className="flex items-center">
          <span className="text-[16px] text-[#666]">Sản phẩm</span>
          <span className="ml-2 text-[16px] text-primary">{qty}</span>
        </div>
        <div className="flex items-center">
          <span className="text-[16px] text-[#666]">Tham gia</span>
          <span className="ml-2 text-[16px] text-primary">{dayjs(createdAt).format('DD/MM/YYYY')}</span>
        </div>
        <div className="flex items-center">
          <span className="text-[16px] text-[#666]">Đánh giá</span>
          <span className="ml-2 text-[16px] text-primary">{formatPrices1(qtyComment || 0)}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
