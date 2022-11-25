import React, { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Contact } from "../../models/contact.model";
import Button from "../Button";
import AddressCard from "../Cards/AddressCard";
import TextField from "../TextField";

type ModalAddressProps = {
  open: boolean;
  onHide: () => void;
  currentAddress?: Contact | undefined
};

const ModalAddress: FC<ModalAddressProps> = ({ open, onHide, currentAddress }) => {

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    resetField
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: ""
    },
  });

  useEffect(() => {
    if (currentAddress) {
      setValue("name", currentAddress.name)
      setValue("phone", currentAddress.phone)
      setValue("address", currentAddress.address)
    } else {
      resetField("address")
      resetField("name")
      resetField("phone")
    }
  }, [currentAddress])

  const handle = (data: any) => {

  }

  return (
    <div className={`${open ? "flex" : "hidden"}`}>
      <div
        className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.6)]"
        onClick={() => {
          onHide();
        }}
      ></div>
      <div
        className={`animateOpacity fixed top-[50%] left-[50%] z-[200] w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-sm bg-white px-6 py-4 shadow-md transition-all ${!open && "hidden"
          }`}
      >
        <h3 className="text-[17px]">{currentAddress ? "Cập nhật" : "Thêm"} địa chỉ</h3>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">

            <div> <TextField
              control={control}
              error={errors}
              name={"name"}
              className="w-full rounded-sm border py-2 px-4 outline-none"
              placeholder="Họ và tên"
              rules={{
                required: {
                  value: true,
                  message: "Vui lòng điền vào mục này",
                },
              }}
            /></div>
            <div><TextField
              control={control}
              error={errors}
              name={"phone"}
              className="w-full rounded-sm border py-2 px-4 outline-none"
              placeholder="Số điện thoại"
              rules={{
                required: {
                  value: true,
                  message: "Vui lòng điền vào mục này",
                },
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message: "Vui lòng nhập đúng số điện thoại",
                },
              }}
            /></div>

          </div>

          <TextField
            control={control}
            error={errors}
            name={"address"}
            className="mt-4 min-h-[50px] w-full rounded-sm border py-2 px-4 outline-none"
            placeholder="Địa chỉ cụ thể"
            rules={{
              required: {
                value: true,
                message: "Vui lòng điền vào mục này",
              }
            }}
          />

        </div>
        <div className="mt-4 flex items-center justify-end">
          <Button
            text="Hủy"
            onClick={onHide}
            className="flex w-[150px] select-none items-center justify-center rounded-sm border border-[#999] px-4 py-2 text-center uppercase shadow-sm transition-all hover:opacity-80"
          />
          <Button
            onClick={handleSubmit(handle)}
            text={currentAddress ? "Cập nhật" : "Thêm"}
            className="ml-2 flex w-[150px] select-none items-center justify-center rounded-sm border  bg-primary px-4 py-2 uppercase text-white shadow-sm transition-all hover:opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalAddress;
