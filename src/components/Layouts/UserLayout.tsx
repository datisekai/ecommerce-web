import React, { FC, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../Button";
import MainLayout from "./MainLayout";
import WidthLayout from "./WidthLayout";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { BiNotepad } from "react-icons/bi";
import { useRouter } from "next/router";

type UserLayoutProps = {
  children: React.ReactNode;
  bgcolor?: string;
};

const UserLayout: FC<UserLayoutProps> = ({
  children,
  bgcolor = "bg-white",
}) => {
  const router = useRouter();
  const [showMenuUser, setShowMenuUser] = useState(true);

  return (
    <MainLayout>
      <WidthLayout>
        <div className="mx-auto max-w-[calc(100%-16px)] py-4">
          <div className="flex">
            <div className="w-[200px] px-2">
              <div className="flex items-center border-b py-2">
                <LazyLoadImage
                  src="https://source.unsplash.com/random"
                  className="aspect-[1/1] w-[48px] rounded-full"
                />
                <div className="ml-2 ">
                  <h2>bedat115</h2>
                  <Link href={"/user"}>
                    <Button
                      startIcon={MdEdit}
                      classNameStarIcon={"text-[#666]"}
                      text="Sửa hồ sơ"
                      className=" mt-1 capitalize text-[#666]"
                    />
                  </Link>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div
                    onClick={() => {
                      setShowMenuUser(!showMenuUser);
                    }}
                    className="flex items-center py-2 transition-all hover:cursor-pointer"
                  >
                    <FaUserAlt className="text-[18px] text-blue-500" />
                    <p className="ml-2 capitalize line-clamp-1">
                      Tài khoản của tôi
                    </p>
                  </div>
                  <ul
                    className={`max-h-0 w-full overflow-hidden pl-7 ${
                      showMenuUser && "max-h-[500px]"
                    }`}
                    style={{
                      transition: showMenuUser
                        ? "max-height ease-in 1s"
                        : "max-height ease-out 0.25s",
                    }}
                  >
                    <Link href={"/user"}>
                      <li
                        className={`py-2 capitalize hover:cursor-pointer hover:text-primary ${
                          router.asPath === "/user" && "text-primary"
                        }`}
                      >
                        Hồ sơ
                      </li>
                    </Link>
                    <Link href={"/user/address"}>
                      <li
                        className={`py-2 capitalize hover:cursor-pointer hover:text-primary ${
                          router.asPath === "/user/address" && "text-primary"
                        }`}
                      >
                        Địa chỉ
                      </li>
                    </Link>
                    <Link href={"/user/auth"}>
                      <li
                        className={`py-2 capitalize hover:cursor-pointer hover:text-primary ${
                          router.asPath === "/user/auth" && "text-primary"
                        }`}
                      >
                        Đổi mật khẩu
                      </li>
                    </Link>
                  </ul>
                </div>

                <Link href={"/user/purchase"}>
                  <div
                    className={`flex items-center py-2 transition-all hover:cursor-pointer`}
                  >
                    <BiNotepad className="text-[20px] text-blue-500" />
                    <p
                      className={`ml-2 capitalize line-clamp-1 ${
                        router.asPath.indexOf("/user/purchase") !== -1 &&
                        "text-primary"
                      }`}
                    >
                      Đơn mua
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className={`flex-1 rounded-sm px-6 py-4 shadow-md ${bgcolor}`}>
              {children}
            </div>
          </div>
        </div>
      </WidthLayout>
    </MainLayout>
  );
};

export default UserLayout;
