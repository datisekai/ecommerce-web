import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useEffect } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SlUser } from "react-icons/sl";
import LoginLayout from "../components/Layouts/LoginLayout";
import Meta from "../components/Meta";
import LoginApi from "../services/handle-login";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import FullLoading from "../components/Loading/FullLoading";
import TextField from "../components/TextField";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Spin } from "react-cssfx-loading";
import toast from "react-hot-toast";
import Notify from "../components/Toast/notify";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const checkLogin = async () => {
    if (session && status === "authenticated") {
      const token = jwt.sign(
        session.user as any,
        process.env.NEXT_PUBLIC_JWT as string
      );
      const newToken = await LoginApi.loginSocial(token);
      setCookie("token", newToken);
      router.push("/");
    }
  };

  useEffect(() => {
    checkLogin();
  }, [session]);

  const { mutate: login, isLoading } = useMutation(LoginApi.login, {
    onSuccess: (data: string) => {
      setCookie("token", data);
      router.push("/");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error?.message);
      // toast.custom((t) => <Notify t={t} message={error?.message} />);
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const handleLogin = (data: any) => {
    console.log(data);
    login(data);
  };

  if (status === "authenticated") {
    return <FullLoading />;
  }

  return (
    <>
      <Meta
        image="https://source.unsplash.com/random"
        title="Đăng nhập tài khoản  - Mua sắm Online | Shopee Việt Nam"
        description="Đăng nhập Tài khoản Shopee và tận hưởng ưu đãi độc quyền với giá cả hấp dẫn trên Shopee Việt Nam!"
      />
      <LoginLayout title="Đăng nhập">
        <div className="absolute hidden w-[90%] translate-y-[-50%] rounded-md bg-white p-7 md:w-[60%] lg:top-[50%] lg:right-[15%] lg:block lg:w-[400px]">
          <h3 className="mb-1 text-[18px] lg:text-[20px]">Đăng nhập</h3>
          <form onSubmit={handleSubmit(handleLogin)}>
            <TextField
              control={control}
              error={errors}
              name="phone"
              placeholder="Số điện thoại"
              rules={{
                required: {
                  value: true,
                  message: "Vui lòng điền vào mục này",
                },
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message: "Vui lòng nhập đúng số điện thoại",
                },
              }}
            />
            <TextField
              control={control}
              error={errors}
              name="password"
              type="password"
              placeholder="Mật khẩu"
              rules={{
                required: {
                  value: true,
                  message: "Vui lòng điền vào mục này",
                },
              }}
            />
            <button
              onClick={handleSubmit(handleLogin)}
              disabled={isLoading}
              className="mt-7 w-full rounded-sm bg-primary px-4 py-3 text-center font-medium uppercase text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className={`${isLoading && "hidden"}`}> Đăng nhập</span>
              <div
                className={`mx-auto  w-full justify-center ${
                  isLoading ? "flex" : "hidden"
                }`}
              >
                <Spin color="#ffffff" />
              </div>
            </button>
          </form>
          <p className="mt-2 text-[13px] text-blue-600">Quên mật khẩu</p>
          <div className="mt-7 flex items-center">
            <div className="h-[1px] w-full bg-gray-300"></div>
            <p className="px-2 text-[14px] font-medium uppercase text-gray-400">
              Hoặc
            </p>
            <div className="h-[1px] w-full bg-gray-300"></div>
          </div>

          <div className="mt-7 flex items-center justify-between">
            <div className="flex w-full items-center justify-center rounded-sm border border-gray-300 bg-white py-2 px-4 transition-all hover:cursor-pointer hover:bg-gray-200 ">
              <FaFacebook className="text-[28px] text-blue-600" />
              <span className="ml-2 text-[16px] text-gray-900">Facebook</span>
            </div>
            <div
              onClick={() => signIn("google")}
              className="ml-2 flex w-full items-center justify-center rounded-sm border border-gray-300 bg-white py-2 px-4 transition-all hover:cursor-pointer hover:bg-gray-200"
            >
              <FcGoogle className="text-[28px] " />
              <span className="ml-2 text-[16px] text-gray-900">Google</span>
            </div>
          </div>

          <div className="mt-7 text-center text-[16px] text-gray-400">
            Bạn mới biết đến Shopee?
            <Link href={"/sign-up"}>
              <span className="px-1 text-primary hover:cursor-pointer">
                Đăng ký
              </span>
            </Link>
          </div>
        </div>
        <div className="block min-h-screen px-6 lg:hidden">
          <div className="mx-auto mt-12 h-[51px] w-[45px]">
            <svg enable-background="new 0 0 54 61" viewBox="0 0 54 61">
              <path
                stroke="#ee4d2d"
                fill="#ee4d2d"
                d="M35.67,44.95 C35.34,47.70 33.67,49.91 31.09,51.01 C29.65,51.63 27.72,51.96 26.19,51.85 C23.81,51.76 21.57,51.18 19.50,50.12 C18.77,49.74 17.67,48.99 16.82,48.28 C16.61,48.10 16.58,47.99 16.73,47.78 C16.80,47.67 16.94,47.46 17.25,47.01 C17.71,46.34 17.76,46.26 17.81,46.18 C17.96,45.96 18.19,45.94 18.42,46.12 C18.45,46.14 18.45,46.14 18.47,46.16 C18.50,46.19 18.50,46.19 18.59,46.26 C18.68,46.33 18.74,46.37 18.76,46.39 C20.99,48.13 23.58,49.13 26.20,49.24 C29.84,49.19 32.46,47.55 32.93,45.03 C33.44,42.27 31.27,39.88 27.02,38.54 C25.69,38.13 22.33,36.78 21.71,36.42 C18.80,34.71 17.44,32.47 17.64,29.71 C17.93,25.88 21.49,23.03 25.98,23.01 C27.98,23.01 29.99,23.42 31.91,24.23 C32.60,24.52 33.81,25.18 34.23,25.50 C34.47,25.68 34.52,25.88 34.38,26.11 C34.31,26.24 34.18,26.44 33.91,26.87 L33.91,26.87 C33.55,27.44 33.54,27.46 33.46,27.59 C33.32,27.80 33.15,27.82 32.90,27.66 C30.84,26.28 28.55,25.58 26.04,25.53 C22.91,25.59 20.57,27.45 20.42,29.99 C20.38,32.28 22.09,33.95 25.80,35.22 C33.33,37.64 36.21,40.48 35.67,44.95 M26.37,5.43 C31.27,5.43 35.27,10.08 35.46,15.90 L17.29,15.90 C17.47,10.08 21.47,5.43 26.37,5.43 M51.74,17.00 C51.74,16.39 51.26,15.90 50.66,15.90 L50.64,15.90 L38.88,15.90 C38.59,8.21 33.10,2.08 26.37,2.08 C19.64,2.08 14.16,8.21 13.87,15.90 L2.07,15.90 C1.48,15.91 1.01,16.40 1.01,17.00 C1.01,17.03 1.01,17.05 1.01,17.08 L1.00,17.08 L2.68,54.14 C2.68,54.25 2.69,54.35 2.69,54.46 C2.69,54.48 2.70,54.50 2.70,54.53 L2.70,54.60 L2.71,54.61 C2.96,57.19 4.83,59.26 7.38,59.36 L7.38,59.37 L44.80,59.37 C44.81,59.37 44.83,59.37 44.85,59.37 C44.87,59.37 44.88,59.37 44.90,59.37 L44.98,59.37 L44.98,59.36 C47.57,59.29 49.67,57.19 49.89,54.58 L49.89,54.58 L49.90,54.54 C49.90,54.51 49.90,54.49 49.90,54.46 C49.90,54.39 49.91,54.33 49.91,54.26 L51.74,17.05 L51.74,17.05 C51.74,17.04 51.74,17.02 51.74,17.00"
              ></path>
            </svg>
          </div>
          <div className="mt-10 flex items-center border-b-2">
            <SlUser className="text-[18px] font-light" />
            <TextField
              control={control}
              error={errors}
              name="phone"
              placeholder="Số điện thoại"
              className="px-4 py-2 text-[16px] outline-none"
              showError={false}
              rules={{
                required: {
                  value: true,
                  message: "Vui lòng điền vào mục này",
                },
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message: "Vui lòng nhập đúng số điện thoại",
                },
              }}
            />
          </div>
          {errors["phone"] && (
            <p className="mt-[2px] text-red-500">{errors["phone"].message}</p>
          )}
          <div className="mt-4 flex items-center border-b-2">
            <AiOutlineLock className="text-[22px] font-light" />
            <TextField
              control={control}
              error={errors}
              name="password"
              type="password"
              placeholder="Mật khẩu"
              className="px-4 py-2 text-[16px] outline-none"
              showError={false}
              rules={{
                required: {
                  value: true,
                  message: "Vui lòng điền vào mục này",
                },
              }}
            />
          </div>
          {errors["password"] && (
            <p className="mt-[2px] text-red-500">
              {errors["password"].message}
            </p>
          )}
          <button
            onClick={handleSubmit(handleLogin)}
            disabled={isLoading}
            className="mt-5 w-full rounded-sm bg-primary px-4 py-3 text-[16px] text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          >
            <span className={`${isLoading && "hidden"}`}> Đăng nhập</span>
            <div
              className={`mx-auto  w-full justify-center ${
                isLoading ? "flex" : "hidden"
              }`}
            >
              <Spin color="#ffffff" />
            </div>
          </button>
          <div className="mt-4 flex items-center justify-between">
            <Link href={"/sign-up"}>
              <p className="text-[14px] text-blue-600">Đăng ký</p>
            </Link>
            <p className="text-[14px] text-blue-600">Quên mật khẩu</p>
          </div>
          <div className="mt-10 flex items-center">
            <div className="h-[1px] w-full bg-gray-300"></div>
            <p className="px-2 text-[14px] font-medium uppercase text-gray-400">
              Hoặc
            </p>
            <div className="h-[1px] w-full bg-gray-300"></div>
          </div>

          <div className="mt-5">
            <div
              onClick={() => signIn("facebook")}
              className="mt-2 flex items-center border border-gray-300 py-[6px] px-2"
            >
              <FaFacebook className="text-[24px] text-blue-600" />
              <span className="ml-2 flex-1 text-center text-[14px] text-gray-900">
                Tiếp tục với Facebook
              </span>
            </div>
            <div
              onClick={() => signIn("google")}
              className="mt-2 flex items-center border border-gray-300 py-[6px] px-2"
            >
              <FcGoogle className="text-[24px] " />
              <span className="ml-2 flex-1 text-center text-[14px] text-gray-900">
                Tiếp tục với Google
              </span>
            </div>
          </div>
        </div>
      </LoginLayout>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = req.cookies["token"];

  if (token) {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};
