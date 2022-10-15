import React, { FC } from "react";
import Children from "../../models/Children";
import Header from "../Headers/Header";

const MainLayout: FC<Children> = ({ children }) => {
  return (
    <div className="">
      <Header />
      <div className="mt-[130px] min-h-screen">MainLayout</div>
    </div>
  );
};

export default MainLayout;
