import { getCookie } from "cookies-next";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import AuthLayout from "../components/Layouts/AuthLayout";
import MainLayout from "../components/Layouts/MainLayout";
import FullLoading from "../components/Loading/FullLoading";
import Section1 from "../components/Sections/Section1";
import SectionMain from "../components/Sections/SectionMain";
import Slider from "../components/Slider";

const Home: NextPage = ({ token }: any) => {
  return (
    <>
      <Head>
        <title>
          Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website
        </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthLayout token={token}>
        <MainLayout>
          <Slider />
          <Section1 />
          <SectionMain />
        </MainLayout>
      </AuthLayout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = req.cookies["token"];

  if (token) {
    return {
      props: {
        token,
      },
    };
  }

  return {
    props: {},
  };
};
