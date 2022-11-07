import React, { useState } from "react";
import Button from "../../components/Button";
import UserLayout from "../../components/Layouts/UserLayout";
import Meta from "../../components/Meta";
import { AiOutlinePlus } from "react-icons/ai";
import AddressCard from "../../components/Cards/AddressCard";
import VoucherModal from "../../components/Popup/VoucherModal";
import AddressModal from "../../components/Popup/AddressModal";
import ModalAddress from "../../components/Popup/ModalAddress";

const Address = () => {
  const [openAddress, setOpenAddress] = useState(false);

  return (
    <>
      <Meta
        image="https://glints.com/vn/blog/wp-content/uploads/2022/10/chie%CC%82%CC%81n-di%CC%A3ch-truye%CC%82%CC%80n-tho%CC%82ng-cu%CC%89a-shopee.jpeg"
        description="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
        title="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
      />
      <UserLayout>
        <div>
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-[17px]">Địa chỉ của tôi</h1>
            <Button
              text="Thêm địa chỉ mới"
              onClick={() => setOpenAddress(true)}
              className="flex items-center rounded-sm bg-primary px-6 py-2 text-white"
              startIcon={AiOutlinePlus}
              classNameStarIcon="text-white text-[20px] mr-2"
            />
          </div>
          <div>
            <AddressCard handleShow={() => setOpenAddress(true)} />
            <AddressCard handleShow={() => setOpenAddress(true)} />
            <AddressCard handleShow={() => setOpenAddress(true)} />
            <AddressCard handleShow={() => setOpenAddress(true)} />
          </div>
        </div>
        <ModalAddress open={openAddress} onHide={() => setOpenAddress(false)} />
      </UserLayout>
    </>
  );
};

export default Address;
