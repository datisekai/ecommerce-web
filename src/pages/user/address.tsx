import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillBackward, AiOutlinePlus } from "react-icons/ai";
import Button from "../../components/Button";
import AddressCard from "../../components/Cards/AddressCard";
import AuthLayout from "../../components/Layouts/AuthLayout";
import UserLayout from "../../components/Layouts/UserLayout";
import ShadowLoading from "../../components/Loading/ShadowLoading";
import Meta from "../../components/Meta";
import ModalAddress from "../../components/Popup/ModalAddress";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { Contact } from "../../models/contact.model";
import ContactApi from "../../services/contact";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const Address = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [openAddress, setOpenAddress] = useState(false);
  const [data, setData] = useState<Contact | undefined>();
  const dispatch = useAppDispatch();
  const router = useRouter();


  const { data: address } = useQuery(['address'], ContactApi.getAllContact);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(ContactApi.setDefaultContact, {
    onSuccess: (data) => {
      const newAddress = address.map(item => {
        if (item.id == data.id) {
          item.active = true;
        } else {
          item.active = false
        }
        return item;
      })
      queryClient.setQueryData(['address'], newAddress)
    },
    onError: (error: any) => {
      console.log(error);
    }
  })

  const handleOnChecked = (id: string | number) => {
    mutate(id);
  }

  if (isLoading) {
    return <ShadowLoading />
  }

  const { redirect } = router.query;

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
              <div className="flex items-center">
                {redirect && <Button
                  text="Trở lại thanh toán"
                  onClick={() => router.push(`/${redirect}`)}
                  className="flex items-center rounded-sm bg-[#666] px-6 py-2 text-white"
                  startIcon={AiFillBackward}
                  classNameStarIcon="text-white text-[20px] mr-2"
                />}
                <Button
                  text="Thêm địa chỉ mới"
                  onClick={() => setOpenAddress(true)}
                  className="flex items-center rounded-sm bg-primary px-6 py-2 text-white ml-1"
                  startIcon={AiOutlinePlus}
                  classNameStarIcon="text-white text-[20px] mr-2"
                />
              </div>
            </div>
            <div>
              {address?.map(item => <AddressCard handleShow={() => {
                setData(item)
                setOpenAddress(true)
              }} {...item} key={item.id} onChange={handleOnChecked} />)}
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies["token"];
  if (token) {


    return {
      props: {
      },
    };
  }

  return {
    notFound: true
  }

};