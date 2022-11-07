import React, { FC, useCallback } from "react";
import Button from "../Button";

type AddressCardProps = {
  handleChangeTab?: (tab: number) => void;
  handleShow?: any;
};

const AddressCard: FC<AddressCardProps> = ({ handleChangeTab, handleShow }) => {
  return (
    <div className="flex items-center justify-between border-b py-4 first:border-t last:border-none">
      <div className="flex items-center">
        <input
          type="radio"
          name="defaultAddress"
          id="defaultAddress"
          className="h-4 w-4 text-primary"
        />
        <label htmlFor="defaultAddress" className="ml-4">
          <div className="flex items-center">
            <p className="text-[17px] capitalize">Thanh thoảng</p>
            <p className="ml-2 text-[#666]">0886249022</p>
          </div>
          <p className="text-[#666]">
            373/35a Lý Thường Kiệt,P9,Tân Bình Phường 9, Quận Tân Bình, TP. Hồ
            Chí Minh
          </p>
        </label>
      </div>
      <Button
        onClick={() =>
          handleChangeTab ? handleChangeTab(2) : handleShow() || undefined
        }
        text="Cập nhật"
        className="w-[30%] select-none capitalize text-blue-500"
      />
    </div>
  );
};

export default AddressCard;
