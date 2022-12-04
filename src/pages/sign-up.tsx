import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import LoginLayout from "../components/Layouts/LoginLayout";
import Meta from "../components/Meta";
import { SlUser } from "react-icons/sl";
import { AiOutlineLock } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "../components/TextField";
import { useMutation } from "@tanstack/react-query";
import LoginApi from "../services/handle-login";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GiConfirmed } from "react-icons/gi";

const SignUp = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [step, setStep] = useState(1); //1->sdt, 2->password

  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
      matchPassword: "",
    },
  });
  const pwd = watch("password");

  const { mutate: signUp, isLoading } = useMutation(LoginApi.signUp, {
    onSuccess: (data: string) => {
      setCookie("token", data);
      router.push("/");
    },
    onError: (error: any) => {
      error.message && toast.error(error.message);
      setStep(1);
    },
  });

  const handleSignUp = (data: any) => {
    signUp(data);
  };

  return (
    <>
      <Meta
        description="Đăng ký tài khoản hôm nay và nhận ngay vô số deal và voucher độc quyền dành cho khách hàng mới trên Shopee Việt Nam!"
        image="https://source.unsplash.com/random"
        title="Đăng ký ngay | Shopee Việt Nam"
      />
      <LoginLayout>
        <div className="absolute top-[50%] right-[15%] hidden w-[400px] translate-y-[-50%] rounded-md bg-white p-7 lg:block">
          <h3 className="text-[18px] lg:text-[20px]">Đăng ký</h3>
          <div className={`${step !== 1 && "hidden"}`}>
            <TextField
              control={control}
              error={errors}
              name="phone"
              placeholder="Số điện thoại"
              className={`mt-7 w-full rounded-sm border px-4 py-3 text-[15px] outline-none focus:border-black lg:text-[16px] `}
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

          <div className={` ${step === 2 ? "block" : "hidden"}`}>
            <TextField
              control={control}
              error={errors}
              name="password"
              placeholder="Mật khẩu"
              rules={{
                required: {
                  value: true,
                  message: "Vui lòng điền vào mục này",
                },
              }}
            />
            <TextField
              control={control}
              error={errors}
              name="matchPassword"
              placeholder="Xác nhận mật khẩu"
              rules={{
                required: {
                  value: true,
                  message: "Vui lòng điền vào mục này",
                },
                validate: (value: string) =>
                  value === pwd || "Mật khẩu chưa khớp",
              }}
            />
          </div>
          {step === 2 ? (
            <div className="flex items-center">
              <button
                disabled={isLoading}
                onClick={() => setStep(step - 1)}
                className="mt-7 w-full rounded-sm bg-gray-400 px-4 py-3 font-medium uppercase text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Quay lại
              </button>
              <button
                disabled={isLoading}
                onClick={handleSubmit(handleSignUp)}
                className="mt-7 ml-2 w-full rounded-sm bg-primary px-4 py-3 font-medium uppercase text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Đăng ký
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                handleSubmit(handleSignUp);
                if (!errors["phone"]) {
                  setStep(step + 1);
                }
              }}
              className="mt-7 w-full rounded-sm bg-primary px-4 py-3 font-medium uppercase text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Tiếp theo
            </button>
          )}

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
            <div className="ml-2 flex w-full items-center justify-center rounded-sm border border-gray-300 bg-white py-2 px-4 transition-all hover:cursor-pointer hover:bg-gray-200">
              <FcGoogle className="text-[28px] " />
              <span className="ml-2 text-[16px] text-gray-900">Google</span>
            </div>
          </div>

          <div className="mt-7 text-center">
            Bằng việc đăng kí, bạn đã đồng ý với Shopee về
            <br />
            <a href="#" className="text-primary">
              Điều khoản dịch vụ
            </a>{" "}
            <span className="px-1">&</span>
            <a href="#" className="text-primary">
              Chính sách bảo mật
            </a>
          </div>

          <div className="mt-7 text-center text-[16px] text-gray-400">
            Bạn đã có tài khoản?{" "}
            <Link href={"/login"}>
              <span className="text-primary hover:cursor-pointer">
                Đăng nhập
              </span>
            </Link>
          </div>
        </div>
        <div className="block min-h-screen px-6 lg:hidden">
          <div className="mx-auto mt-12 h-[51px] w-[45px]">
            <svg enableBackground="new 0 0 54 61" viewBox="0 0 54 61">
              <path
                stroke="#ee4d2d"
                fill="#ee4d2d"
                d="M35.67,44.95 C35.34,47.70 33.67,49.91 31.09,51.01 C29.65,51.63 27.72,51.96 26.19,51.85 C23.81,51.76 21.57,51.18 19.50,50.12 C18.77,49.74 17.67,48.99 16.82,48.28 C16.61,48.10 16.58,47.99 16.73,47.78 C16.80,47.67 16.94,47.46 17.25,47.01 C17.71,46.34 17.76,46.26 17.81,46.18 C17.96,45.96 18.19,45.94 18.42,46.12 C18.45,46.14 18.45,46.14 18.47,46.16 C18.50,46.19 18.50,46.19 18.59,46.26 C18.68,46.33 18.74,46.37 18.76,46.39 C20.99,48.13 23.58,49.13 26.20,49.24 C29.84,49.19 32.46,47.55 32.93,45.03 C33.44,42.27 31.27,39.88 27.02,38.54 C25.69,38.13 22.33,36.78 21.71,36.42 C18.80,34.71 17.44,32.47 17.64,29.71 C17.93,25.88 21.49,23.03 25.98,23.01 C27.98,23.01 29.99,23.42 31.91,24.23 C32.60,24.52 33.81,25.18 34.23,25.50 C34.47,25.68 34.52,25.88 34.38,26.11 C34.31,26.24 34.18,26.44 33.91,26.87 L33.91,26.87 C33.55,27.44 33.54,27.46 33.46,27.59 C33.32,27.80 33.15,27.82 32.90,27.66 C30.84,26.28 28.55,25.58 26.04,25.53 C22.91,25.59 20.57,27.45 20.42,29.99 C20.38,32.28 22.09,33.95 25.80,35.22 C33.33,37.64 36.21,40.48 35.67,44.95 M26.37,5.43 C31.27,5.43 35.27,10.08 35.46,15.90 L17.29,15.90 C17.47,10.08 21.47,5.43 26.37,5.43 M51.74,17.00 C51.74,16.39 51.26,15.90 50.66,15.90 L50.64,15.90 L38.88,15.90 C38.59,8.21 33.10,2.08 26.37,2.08 C19.64,2.08 14.16,8.21 13.87,15.90 L2.07,15.90 C1.48,15.91 1.01,16.40 1.01,17.00 C1.01,17.03 1.01,17.05 1.01,17.08 L1.00,17.08 L2.68,54.14 C2.68,54.25 2.69,54.35 2.69,54.46 C2.69,54.48 2.70,54.50 2.70,54.53 L2.70,54.60 L2.71,54.61 C2.96,57.19 4.83,59.26 7.38,59.36 L7.38,59.37 L44.80,59.37 C44.81,59.37 44.83,59.37 44.85,59.37 C44.87,59.37 44.88,59.37 44.90,59.37 L44.98,59.37 L44.98,59.36 C47.57,59.29 49.67,57.19 49.89,54.58 L49.89,54.58 L49.90,54.54 C49.90,54.51 49.90,54.49 49.90,54.46 C49.90,54.39 49.91,54.33 49.91,54.26 L51.74,17.05 L51.74,17.05 C51.74,17.04 51.74,17.02 51.74,17.00"
              ></path>
            </svg>
          </div>
          {step === 1 && (
            <>
              <div className="mt-10 flex items-center border-b-2">
                <SlUser className="text-[18px] font-light" />

                <TextField
                  control={control}
                  error={errors}
                  name="phone"
                  placeholder="Số điện thoại"
                  className={`px-4 py-2 text-[16px] outline-none `}
                  showError={false}
                  rules={{
                    required: {
                      value: true,
                      message: "Vui lòng điền vào mục này",
                    },
                    pattern: {
                      value:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      message: "Vui lòng nhập đúng số điện thoại",
                    },
                  }}
                />
              </div>
              {errors["phone"] && (
                <p className="mt-[2px] text-red-500">
                  {errors["phone"].message}
                </p>
              )}
            </>
          )}
          {step === 2 && (
            <>
              <div className="mt-4 flex items-center border-b-2">
                <AiOutlineLock className="text-[22px] font-light" />
                <TextField
                  control={control}
                  error={errors}
                  name="password"
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
            </>
          )}

          {step === 2 && (
            <>
              <div className="mt-4 flex items-center border-b-2">
                <GiConfirmed className="text-[20px] font-light" />
                <TextField
                  control={control}
                  error={errors}
                  name="matchPassword"
                  placeholder="Xác nhận mật khẩu"
                  className="px-4 py-2 text-[16px] outline-none"
                  showError={false}
                  rules={{
                    required: {
                      value: true,
                      message: "Vui lòng điền vào mục này",
                    },
                    validate: (value: string) =>
                      value === pwd || "Mật khẩu chưa khớp",
                  }}
                />
              </div>
              {errors["matchPassword"] && (
                <p className="mt-[2px] text-red-500">
                  {errors["matchPassword"].message}
                </p>
              )}
            </>
          )}

          {step === 2 ? (
            <div className="flex items-center">
              <button
                disabled={isLoading}
                onClick={() => setStep(step - 1)}
                className="mt-7 w-full rounded-sm bg-gray-400 px-4 py-3 font-medium uppercase text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Quay lại
              </button>
              <button
                disabled={isLoading}
                onClick={handleSubmit(handleSignUp)}
                className="mt-7 ml-2 w-full rounded-sm bg-primary px-4 py-3 font-medium uppercase text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Đăng ký
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                handleSubmit(handleSignUp);
                if (!errors["phone"]) {
                  setStep(step + 1);
                }
              }}
              className="mt-7 w-full rounded-sm bg-primary px-4 py-3 font-medium uppercase text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Tiếp theo
            </button>
          )}

          <div className="mt-4 flex items-center justify-between">
            <Link href={"/login"}>
              <p className="text-[14px] text-blue-600">Đăng nhập</p>
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
            <div className="mt-2 flex items-center border border-gray-300 py-[6px] px-2">
              <FaFacebook className="text-[24px] text-blue-600" />
              <span className="ml-2 flex-1 text-center text-[14px] text-gray-900">
                Tiếp tục với Facebook
              </span>
            </div>
            <div className="mt-2 flex items-center border border-gray-300 py-[6px] px-2">
              <FcGoogle
                onClick={() => signIn("google")}
                className="text-[24px] "
              />
              <span className="ml-2 flex-1 text-center text-[14px] text-gray-900">
                Tiếp tục với Google
              </span>
            </div>
          </div>
          <div className="mt-7 text-center">
            Bằng việc đăng kí, bạn đã đồng ý với Shopee về
            <br />
            <a href="#" className="text-blue-600 ">
              Điều khoản dịch vụ
            </a>{" "}
            <span className="px-1">&</span>
            <a href="#" className="text-blue-600 ">
              Chính sách bảo mật
            </a>
          </div>
        </div>
      </LoginLayout>
    </>
  );
};

export default SignUp;

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
