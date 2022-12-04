import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../../components/Button";
import AuthLayout from "../../components/Layouts/AuthLayout";
import MainLayout from "../../components/Layouts/MainLayout";
import UserLayout from "../../components/Layouts/UserLayout";
import WidthLayout from "../../components/Layouts/WidthLayout";
import Meta from "../../components/Meta";
import TextField from "../../components/TextField";
import axiosUpload from "../../config/axiosUpload";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateUser } from "../../redux/slices/user";
import userApi from "../../services/user";
import { uploadImg } from "../../utils";
import generateAvatar from "../../utils/generateAvatar";

const User = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { user } = useAppSelector((state) => state.user);
  const [gender, setGender] = useState("other");
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState("");

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
    },
  });

  const handleChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setGender(e.target.id);
    }
  };

  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }, [file]);

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = useMutation(userApi.update, {
    onSuccess: (data) => {
      dispatch(updateUser(data));
      toast.success("Cập nhật thành công");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Vui lòng thử lại");
    },
  });

  useEffect(() => {
    if (user) {
      setGender(user.gender || "other");
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("date", dayjs(user.date).format("YYYY-MM-DD"));
    }
  }, [user]);

  const handleUpdate = async (data: any) => {
    let image = user.image;
    if (preview) {
      image = await uploadImg(file);
    }
    console.log(data);
    mutate({
      ...data,
      image,
      gender,
      date: dayjs(data.date).format("YYYY-MM-DD hh:mm:ss"),
    });
  };

  return (
    <>
      <Meta
        image="https://glints.com/vn/blog/wp-content/uploads/2022/10/chie%CC%82%CC%81n-di%CC%A3ch-truye%CC%82%CC%80n-tho%CC%82ng-cu%CC%89a-shopee.jpeg"
        description="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
        title="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
      />
      <AuthLayout>
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
                <p className="ml-4">{user?.phone || "Login with Google"}</p>
              </div>
              <div className="mt-6 flex items-center">
                <label className="w-[20%] text-right text-[#666] line-clamp-1">
                  Tên
                </label>

                <TextField
                  className="ml-4 rounded-sm border py-3 px-4 text-[#666] outline-none"
                  control={control}
                  error={errors}
                  name={"name"}
                />
              </div>
              <div className="mt-6 flex items-center">
                <label className="w-[20%] text-right text-[#666] line-clamp-1">
                  Email
                </label>
                <TextField
                  className="ml-4 rounded-sm border py-3 px-4 text-[#666] outline-none"
                  control={control}
                  error={errors}
                  name={"email"}
                />
              </div>
              <div className="mt-6 flex items-center">
                <label className="w-[20%] text-right text-[#666] line-clamp-1">
                  Số điện thoại
                </label>
                <TextField
                  className="ml-4 rounded-sm border py-3 px-4 text-[#666] outline-none"
                  control={control}
                  error={errors}
                  name={"phone"}
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
                      onChange={handleChangeGender}
                      name="gender"
                      id="male"
                      checked={gender == "male"}
                    />
                    <label htmlFor="nam">Nam</label>
                  </div>
                  <div className="ml-2 flex items-center ">
                    <input
                      className="mr-2 h-4 w-4"
                      type="radio"
                      name="gender"
                      onChange={handleChangeGender}
                      id="female"
                      checked={gender == "female"}
                    />
                    <label htmlFor="nu">Nữ</label>
                  </div>
                  <div className="ml-2 flex items-center ">
                    <input
                      className="mr-2 h-4 w-4"
                      type="radio"
                      onChange={handleChangeGender}
                      name="gender"
                      id="other"
                      checked={gender == "other"}
                    />
                    <label htmlFor="other">Khác</label>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <label className="w-[20%] text-right text-[#666] line-clamp-1">
                  Ngày Sinh
                </label>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="ml-4 rounded-sm border py-3 px-4 outline-none"
                    />
                  )}
                />
              </div>
              <div className="mt-6 flex items-center">
                <label className="w-[20%] text-right text-[#666] line-clamp-1"></label>
                <button
                  disabled={isLoading}
                  onClick={handleSubmit(handleUpdate)}
                  className="mt-6 ml-4 rounded-sm bg-primary px-6 py-2 text-white transition-all hover:opacity-80"
                >
                  Lưu
                </button>
              </div>
            </div>
            <div className="mt-4 flex w-[30%] flex-col items-center justify-center border-l px-4 py-6">
              <LazyLoadImage
                src={
                  preview ||
                  user?.image ||
                  generateAvatar(user?.name || user?.email || user?.phone)
                }
                className="mx-auto block aspect-[1/1] w-[100px] rounded-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                name=""
                id="chooseImage"
              />
              <label htmlFor="chooseImage" className="text-center">
                <div className="mt-2 flex items-center justify-center rounded-sm border px-6 py-2 capitalize hover:bg-slate-200">
                  Chọn ảnh
                </div>
              </label>
            </div>
          </div>
        </UserLayout>
      </AuthLayout>
    </>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
