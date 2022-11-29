import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import UserLayout from "../../components/Layouts/UserLayout";
import Meta from "../../components/Meta";
import TextField from "../../components/TextField";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useMutation } from "@tanstack/react-query";
import userApi from "../../services/user";
import toast from "react-hot-toast";

const ChangePassword = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirm: "",
    },
  });

  let pwd = watch("currentPassword");

  const { mutate, isLoading } = useMutation(userApi.changePassword, {
    onSuccess: (data) => {
      toast.success("Đổi mật khẩu thành công")
    },
    onError: (error: any) => {
      console.log(error)
      toast.error("Vui lòng thử lại")
    }
  })

  const handleChangePassword = (data: any) => {
    mutate({
      password: data.password,
      newPassword: data.newPassword
    })
  };

  return (
    <>
      <Meta
        image="https://glints.com/vn/blog/wp-content/uploads/2022/10/chie%CC%82%CC%81n-di%CC%A3ch-truye%CC%82%CC%80n-tho%CC%82ng-cu%CC%89a-shopee.jpeg"
        description="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
        title="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
      />
      <UserLayout>
        <div className="border-b pb-4">
          <h2 className="text-[17px] capitalize">Thêm mật khẩu</h2>
          <p className="mt-1 text-[#666]">
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
          </p>
        </div>
        <div className="py-4">
          <div className="mt-6 flex items-center">
            <label className="w-[20%] text-right text-[#666] line-clamp-1">
              Mật khẩu cũ
            </label>

            <TextField
              control={control}
              error={errors}
              name="password"
              className="ml-4 rounded-sm border py-3 px-4 outline-none "
              showError={false}
              rules={{
                required: {
                  value: true,
                  message: "Vui lòng nhập trường này",
                },
              }}
            />
          </div>
          {errors["password"] && (
            <p className="ml-[calc(20%+16px)] mt-1 text-red-500">
              {errors["password"].message}
            </p>
          )}
          <div className="mt-6 flex items-center">
            <label className="w-[20%] text-right text-[#666] line-clamp-1">
              Nhập mật khẩu mới
            </label>

            <TextField
              control={control}
              error={errors}
              name="newPassword"
              className="ml-4 rounded-sm border py-3 px-4 outline-none "
              showError={false}
              rules={{
                required: {
                  value: true,
                  message: "Vui lòng nhập trường này",
                },
              }}
            />
          </div>
          {errors["newPassword"] && (
            <p className="ml-[calc(20%+16px)] mt-1 text-red-500">
              {errors["newPassword"].message}
            </p>
          )}
          <div className="mt-6 flex items-center">
            <label className="w-[20%] text-right text-[#666] line-clamp-1">
              Xác minh mật khẩu
            </label>

            <TextField
              control={control}
              error={errors}
              name="confirm"
              className="ml-4 rounded-sm border py-3 px-4 outline-none "
              showError={false}
              rules={{
                required: {
                  value: true,
                  message: "Vui lòng nhập trường này",
                },
                validate: (value: any) => value === pwd || "Mật khẩu chưa khớp",
              }}
            />
          </div>
          {errors["confirm"] && (
            <p className="ml-[calc(20%+16px)] mt-1 text-red-500">
              {errors["confirm"].message}
            </p>
          )}
          {/* <div className="mt-6 flex items-center">
            <label className="w-[20%] text-right text-[#666] line-clamp-1">
              Mã xác minh
            </label>
            <TextField
              control={control}
              error={errors}
              name="confirm"
              className="rounded-sm border py-3 px-4 outline-none "
              showError={false}
              rules={{
                required: {
                  value: true,
                  message: "Vui lòng nhập trường này",
                },
              }}
            />

          </div> */}
          {errors["code"] && (
            <p className="ml-[calc(20%+16px)] mt-1 text-red-500">
              {errors["code"].message}
            </p>
          )}
          <div className="mt-6 flex items-center">
            <label className="w-[20%] text-right text-[#666] line-clamp-1"></label>
            <button
              disabled={isLoading}
              onClick={handleSubmit(handleChangePassword)}
              className="ml-4 rounded-sm bg-primary px-6 py-2 text-white hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default ChangePassword;
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