import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import SellerLayout from "../../../components/Layouts/SellerLayout";
import LayoutContentProduct from "../../../components/layoutsAdmin/UIProduct/LayoutContentProduct";
import LayoutTopProduct from "../../../components/layoutsAdmin/UIProduct/LayoutTopProduct";
import ProductApi from "../../../services/product";
import React, { useState } from "react";

const AllProduct = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [status, setStatus] = useState("1");
  const { data, isLoading } = useQuery(["skus", status], () =>
    ProductApi.getSkus(status)
  );

  const handleChange = (type: string) => {
    setStatus(type);
  };
  return (
    <AuthLayout>
      <SellerLayout>
        <div className=" _shadow ml-80 mr-[100px] mt-4 min-w-[900px] rounded-[4px] bg-[#ffffff]">
          <LayoutTopProduct />
        </div>
        <div className=" _shadow relative ml-80 mr-[100px] mt-4 mb-20 min-w-[900px] rounded-[4px] bg-[#ffffff] pb-1">
          <LayoutContentProduct data={data} handleChange={handleChange} />
        </div>
      </SellerLayout>
    </AuthLayout>
  );
};

export default AllProduct;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = req.cookies["token"];

  if (token) {
    return {
      props: {},
    };
  }

  return {
    notFound: true,
  };
};
