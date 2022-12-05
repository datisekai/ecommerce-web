import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import SellerLayout from "../../components/Layouts/SellerLayout";
import LayoutContentBill from "../../components/layoutsAdmin/UIBill/LayoutContentBill";
import OrderApi from "../../services/order";

const Seller = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [status, setStatus] = useState(0);

  const { data, isLoading } = useQuery(["seller-order", status], () =>
    OrderApi.getSeller(status)
  );

  const handleChange = (value: number) => {
    setStatus(value);
  };

  return (
    <SellerLayout>
      <div className=" _shadow relative ml-80 mr-[100px] mt-4 min-w-[900px] rounded-[4px] bg-[#ffffff] pb-1">
        <LayoutContentBill data={data} handleChange={handleChange} />
      </div>
    </SellerLayout>
  );
};

export default Seller;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = req.cookies["token"];
  const perId = req.cookies["perId"];

  if (token && perId === "2") {
    return {
      props: {
        token,
      },
    };
  }

  return {
    props: {},
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};
