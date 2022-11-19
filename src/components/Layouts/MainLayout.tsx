import React, { FC } from "react";
import Children from "../../models/Children";
import Header from "../Headers/Header";
import HeaderMobile from "../Headers/HeaderMobile";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Footer from "../Footers/Footer";
import BottomFooter from "../Footers/BottomFooter";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import CartApi from "../../services/cart";

const MainLayout: FC<Children> = ({ children }) => {
  const token = getCookie("token");
  const { data: carts, isLoading } = useQuery(["cart"], () => {
    if (token) {
      return CartApi.view();
    }
  });
  return (
    <div className="">
      <Header />
      <HeaderMobile />
      <div className="mt-0 min-h-screen bg-bgPrimary pb-[50px]">{children}</div>
      <Footer />
      <BottomFooter />
    </div>
  );
};

export default MainLayout;
