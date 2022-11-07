import React, { FC, useState } from "react";
import Button from "../Button";
import AddressCard from "../Cards/AddressCard";

type AddressModalProps = {
  open: boolean;
  onHide: () => void;
};

const AddressModal: FC<AddressModalProps> = ({ open, onHide }) => {
  const [tab, setTab] = useState(1); //1 -> address, 2 -> update address

  const handleSetTab = (tab: number) => {
    setTab(tab);
  };

  return (
    <div className={`${open ? "flex" : "hidden"}`}>
      <div
        className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.6)]"
        onClick={() => {
          onHide();
          setTab(1);
        }}
      ></div>
      <div
        className={`animateOpacity fixed top-[50%] left-[50%] z-[200] w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-sm bg-white px-6 py-4 shadow-md transition-all ${
          tab !== 1 && "hidden"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] capitalize">địa chỉ của tôi</h2>
        </div>
        <div className="mt-4 max-h-[60vh] overflow-y-scroll px-4 ">
          <AddressCard handleChangeTab={handleSetTab} />
          <AddressCard handleChangeTab={handleSetTab} />
        </div>
        <div className="mt-4 flex items-center justify-end">
          <Button
            onClick={() => {
              onHide();
              setTab(1);
            }}
            text="Hủy"
            className="flex w-[150px] select-none items-center justify-center rounded-sm border border-[#999] px-4 py-2 text-center uppercase shadow-sm transition-all hover:opacity-80"
          />
          <Button
            text="Xác nhận"
            className="ml-2 flex w-[150px] select-none items-center justify-center rounded-sm border  bg-primary px-4 py-2 uppercase text-white shadow-sm transition-all hover:opacity-80"
          />
        </div>
      </div>
      <div
        className={`animateOpacity fixed top-[50%] left-[50%] z-[200] w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-sm bg-white px-6 py-4 shadow-md transition-all ${
          tab !== 2 && "hidden"
        }`}
      >
        <h3 className="text-[17px]">Cập nhật địa chỉ</h3>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              className="w-full rounded-sm border py-2 px-4 outline-none"
              placeholder="Họ và tên"
            />
            <input
              type="text"
              className="w-full rounded-sm border py-2 px-4 outline-none"
              placeholder="Số điện thoại"
            />
          </div>
          <input
            type="text"
            multiple
            className="mt-4 min-h-[50px] w-full rounded-sm border py-2 px-4 outline-none"
            placeholder="Địa chỉ cụ thể"
          />
        </div>
        <div className="mt-4 flex items-center justify-end">
          <Button
            text="Trở lại"
            onClick={() => setTab(1)}
            className="flex w-[150px] select-none items-center justify-center rounded-sm border border-[#999] px-4 py-2 text-center uppercase shadow-sm transition-all hover:opacity-80"
          />
          <Button
            text="Hoàn thành"
            className="ml-2 flex w-[150px] select-none items-center justify-center rounded-sm border  bg-primary px-4 py-2 uppercase text-white shadow-sm transition-all hover:opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
