import React, { FC } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Button from "../Button";
import VoucherCard from "../Cards/VoucherCard";

type VoucherModalProps = {
  open: boolean;
  onHide: () => void;
};

const VoucherModal: FC<VoucherModalProps> = ({ open, onHide }) => {
  return (
    <div className={`${open ? "flex" : "hidden"}`}>
      <div
        className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.6)]"
        onClick={onHide}
      ></div>
      <div className="animateOpacity fixed top-[50%] left-[50%] z-[200] w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-sm bg-white px-6 py-4 shadow-md transition-all">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] capitalize">Chọn Shopee Voucher</h2>
          <div className="flex items-center">
            <span className="text-[15px] capitalize">Hỗ trợ</span>
            <AiOutlineQuestionCircle className="ml-1 text-[16px]" />
          </div>
        </div>
        <div className="mt-4 max-h-[400px] overflow-y-scroll px-4 ">
          <VoucherCard />
          <VoucherCard />
          <VoucherCard />
        </div>
        <div className="mt-4 flex items-center justify-end">
          <Button
            onClick={onHide}
            text="Trở lại"
            className="flex w-[150px] select-none items-center justify-center rounded-sm border border-[#999] px-4 py-2 text-center uppercase shadow-sm transition-all hover:opacity-80"
          />
          <Button
            text="OK"
            className="ml-2 flex w-[150px] select-none items-center justify-center rounded-sm border  bg-primary px-4 py-2 uppercase text-white shadow-sm transition-all hover:opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;
