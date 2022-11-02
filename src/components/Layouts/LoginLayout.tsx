import React, { FC } from "react";
import BottomFooter from "../Footers/BottomFooter";
import Footer from "../Footers/Footer";
import HeaderLogin from "../Headers/HeaderLogin";

type LoginLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const LoginLayout: FC<LoginLayoutProps> = ({ children, title }) => {
  return (
    <div>
      <HeaderLogin title={title} />
      <div className="relative bg-white lg:bg-[#EE4D2D]">
        <img
          src="/bg-login.png"
          className="mx-auto hidden lg:inline-block"
          alt=""
        />
        {children}
      </div>

      <Footer />
      <BottomFooter />
    </div>
  );
};

export default LoginLayout;
