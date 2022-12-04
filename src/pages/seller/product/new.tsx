import React, { useState } from "react";
import SellerLayout from "../../../components/Layouts/SellerLayout";
import Thongtinbanhang from "../../../components/layoutsAdmin/UiAddProduct/Thongtinbanhang";
import Thongtincoban from "../../../components/layoutsAdmin/UiAddProduct/Thongtincoban";
import { v4 as uuidv4 } from "uuid";
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import CategoryApi from "../../../services/category";
import { CategoryModel } from "../../../models/category.model";
import AuthLayout from "../../../components/Layouts/AuthLayout";
type variantOption = {
  name: string;
  variantId: string;
};

type variant = {
  name: string;
  id: string;
};

export interface Sku {
  price: string;
  quantity: string;
  discount: string;
  file?: File;
  preview: string;
}

interface NewProductProps {
  categories: CategoryModel[];
}

export interface InfoBasic {
  file?: File;
  preview: string;
  name: string;
  categoryId: string;
  description: string;
}

const NewProduct: NextPage<NewProductProps> = ({
      categories,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [variant1, setVariant1] = useState<variant>({
    id: uuidv4(),
    name: "",
  });

  const [variant2, setVariant2] = useState<variant>({
    id: uuidv4(),
    name: "",
  });

  const [infoBasic, setInfoBasic] = useState<InfoBasic>({
    categoryId: "",
    description: "",
    name: "",
    preview: "",
    file: null,
  });

  const [skus, setSkus] = useState<Sku[]>([]);

  const handleSetVariant1 = (data: variant) => {
    setVariant1(data);
  };
  const handleSetVariant2 = (data: variant) => {
    setVariant2(data);
  };

  const handleChangeSku = (data: Sku[]) => {
    setSkus(data);
  };

  const handleChangeInfoBasic = (name, value) => {
    if (name === "file") {
      const preview: string = URL.createObjectURL(value as File);
      setInfoBasic({
        ...infoBasic,
        preview: preview,
        file: value,
      });
    } else {
      setInfoBasic({ ...infoBasic, [name]: value });
    }
  };

  return (
    <AuthLayout>
      <SellerLayout>
        <div className="bg-[#F6F6F6] pb-10">
          <div className=" _shadow relative ml-[320px] mr-[100px] mt-4 mb-6 min-w-[900px] rounded-[4px] bg-[#ffffff] pb-1">
            <Thongtincoban
              categories={categories}
              info={infoBasic}
              handleChange={handleChangeInfoBasic}
            />
          </div>
          <div className=" _shadow mt-4min-w-[900px] relative ml-[320px] mr-[100px] rounded-[4px] bg-[#ffffff] pb-1">
            <Thongtinbanhang
              _textGroup1={variant1}
              setTextGroup1={handleSetVariant1}
              _textGroup2={variant2}
              setTextGroup2={handleSetVariant2}
              handleChangeSku={handleChangeSku}
              skus={skus}
              info={infoBasic}
            />
          </div>
        </div>
      </SellerLayout>
    </AuthLayout>
  );
};

export default NewProduct;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = req.cookies["token"];
  const categories = await CategoryApi.getCategory();

  if (token) {
    return {
      props: {
        token,
        categories,
      },
    };
  }

  return {
    notFound: true,
  };
};
