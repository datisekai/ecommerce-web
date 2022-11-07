import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../../components/Button";
import MainLayout from "../../components/Layouts/MainLayout";
import UserLayout from "../../components/Layouts/UserLayout";
import WidthLayout from "../../components/Layouts/WidthLayout";
import Meta from "../../components/Meta";

const User = () => {
  return (
    <>
      <Meta
        image="https://glints.com/vn/blog/wp-content/uploads/2022/10/chie%CC%82%CC%81n-di%CC%A3ch-truye%CC%82%CC%80n-tho%CC%82ng-cu%CC%89a-shopee.jpeg"
        description="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
        title="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
      />
      <UserLayout>
        <div className="border-b pb-4">
          <h2 className="text-[17px] capitalize">Hồ sơ của tôi</h2>
          <p className="mt-1 text-[#666]">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
        <div className="flex items-center">
          <div className="mt-4 w-[70%] pb-4">
            <div className="mt-6 flex items-center">
              <label className="w-[20%] text-right text-[#666] line-clamp-1">
                Tên đăng nhập
              </label>
              <p className="ml-4">bedat115</p>
            </div>
            <div className="mt-6 flex items-center">
              <label className="w-[20%] text-right text-[#666] line-clamp-1">
                Tên
              </label>
              <input
                type="text"
                className="ml-4 rounded-sm border py-3 px-4 outline-none"
                name=""
                id=""
              />
            </div>
            <div className="mt-6 flex items-center">
              <label className="w-[20%] text-right text-[#666] line-clamp-1">
                Email
              </label>
              <input
                type="text"
                className="ml-4 rounded-sm border py-3 px-4 outline-none"
                name=""
                id=""
              />
            </div>
            <div className="mt-6 flex items-center">
              <label className="w-[20%] text-right text-[#666] line-clamp-1">
                Số điện thoại
              </label>
              <input
                type="text"
                className="ml-4 rounded-sm border py-3 px-4 outline-none"
                name=""
                id=""
              />
            </div>
            <div className="mt-6 flex items-center">
              <label className="w-[20%] text-right text-[#666] line-clamp-1">
                Giới tính
              </label>
              <div className="ml-4 flex items-center">
                <div className=" flex items-center ">
                  <input
                    className="mr-2 h-4 w-4"
                    type="radio"
                    name="gender"
                    id="nam"
                  />
                  <label htmlFor="nam">Nam</label>
                </div>
                <div className="ml-2 flex items-center ">
                  <input
                    className="mr-2 h-4 w-4"
                    type="radio"
                    name="gender"
                    id="nu"
                  />
                  <label htmlFor="nu">Nữ</label>
                </div>
                <div className="ml-2 flex items-center ">
                  <input
                    className="mr-2 h-4 w-4"
                    type="radio"
                    name="gender"
                    id="other"
                  />
                  <label htmlFor="other">Khác</label>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <label className="w-[20%] text-right text-[#666] line-clamp-1">
                Ngày Sinh
              </label>
              <input
                type="date"
                className="ml-4 rounded-sm border py-3 px-4 outline-none"
                name=""
                id=""
              />
            </div>
            <div className="mt-6 flex items-center">
              <label className="w-[20%] text-right text-[#666] line-clamp-1"></label>
              <button className="mt-6 ml-4 rounded-sm bg-primary px-6 py-2 text-white transition-all hover:opacity-80">
                Lưu
              </button>
            </div>
          </div>
          <div className="mt-4 w-[30%] border-l px-4 py-6">
            <LazyLoadImage
              src="https://source.unsplash.com/random"
              className="mx-auto block aspect-[1/1] w-[100px] rounded-full"
            />
            <input type="file" className="hidden" name="" id="chooseImage" />
            <label htmlFor="chooseImage">
              <Button
                text="Chọn ảnh"
                className="mt-2  flex items-center justify-center rounded-sm border px-6 py-2 capitalize hover:bg-slate-200"
              />
            </label>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default User;
