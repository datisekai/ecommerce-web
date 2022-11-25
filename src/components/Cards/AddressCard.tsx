import React, { FC, useCallback } from "react";
import { Contact } from "../../models/contact.model";
import Button from "../Button";

interface AddressCardProps extends Contact {
  handleChangeTab?: (tab: number) => void;
  handleShow?: any;
};

const AddressCard: FC<AddressCardProps> = ({ handleChangeTab, handleShow, address, id, name, phone, userId, active }) => {
  return (
    <div className="flex items-center justify-between border-b py-4 first:border-t last:border-none">
      <div className="flex items-center">
        <input
          type="radio"
          name="defaultAddress"
          checked={active}
          id="defaultAddress"
          className="h-4 w-4 text-primary"
        />
        <label htmlFor="defaultAddress" className="ml-4">
          <div className="flex items-center">
            <p className="text-[17px] capitalize">{name}</p>
            <p className="ml-2 text-[#666]">{phone}</p>
          </div>
          <p className="text-[#666]">
            {address}
          </p>
          {active && <span className="border border-primary p-[2px] rounded-sm mt-1 text-[12px]">Mặc định</span>}
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
