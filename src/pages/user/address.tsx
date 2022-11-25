import React, { useState } from "react";
import Button from "../../components/Button";
import UserLayout from "../../components/Layouts/UserLayout";
import Meta from "../../components/Meta";
import { AiOutlinePlus } from "react-icons/ai";
import AddressCard from "../../components/Cards/AddressCard";
import VoucherModal from "../../components/Popup/VoucherModal";
import AddressModal from "../../components/Popup/AddressModal";
import ModalAddress from "../../components/Popup/ModalAddress";
import { useQuery } from "@tanstack/react-query";
import ContactApi from "../../services/contact";
import { CgLayoutGrid } from "react-icons/cg";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { Contact } from "../../models/contact.model";

const Address = (props) => {
  const [openAddress, setOpenAddress] = useState(false);
  const [data, setData] = useState<Contact | undefined>();

  const { data: address, isLoading } = useQuery(['address'], ContactApi.getAllContact);

  console.log(address)

  return (
    <>
      <Meta
        image="https://glints.com/vn/blog/wp-content/uploads/2022/10/chie%CC%82%CC%81n-di%CC%A3ch-truye%CC%82%CC%80n-tho%CC%82ng-cu%CC%89a-shopee.jpeg"
        description="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
        title="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
      />
      <AuthLayout>
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
              {address?.map(item => <AddressCard handleShow={() => {
                setData(item)
                setOpenAddress(true)
              }} {...item} key={item.id} />)}
            </div>
          </div>
          <ModalAddress currentAddress={data} open={openAddress} onHide={() => {
            setData(undefined)
            setOpenAddress(false)
          }} />
        </UserLayout>
      </AuthLayout>
    </>
  );
};

export default Address;
