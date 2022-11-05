import { deleteCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logOut } from "../../redux/slices/user";
import { createAvatar } from "../../utils";

const ActionUser = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logOut());
    deleteCookie("token");
    signOut();
  };

  return (
    <div className="showMenuUser ml-3 flex items-center ">
      <LazyLoadImage
        src={
          // user.image || user.email
          //   ? createAvatar(user.email.slice(0, user.email.indexOf("@")))
          //   : createAvatar(user.phone)
          user.image ||
          createAvatar(
            user.email
              ? user.email.slice(0, user.email.indexOf("@"))
              : user.phone
          )
        }
        style={{ width: 20, height: 20, borderRadius: "50%" }}
      />
      <button
        onClick={handleLogout}
        className="ml-2   overflow-x-hidden capitalize text-white"
        title={user.name || user.email}
      >
        {user.name || user.email || user.phone}
      </button>

      <ul className="square-divider menuUser shadowBox absolute right-0 top-[30px] z-10  hidden flex-col rounded-sm bg-white p-2">
        <li className="py-2 px-2 text-[15px] transition-all hover:cursor-pointer hover:text-primary ">
          Tài khoản của tôi
        </li>
        <li className="py-2 px-2 text-[15px] transition-all hover:cursor-pointer hover:text-primary ">
          Đơn mua
        </li>
        <li
          onClick={handleLogout}
          className="py-2 px-2 text-[15px] transition-all hover:cursor-pointer hover:text-primary "
        >
          Đăng xuất
        </li>
      </ul>
    </div>
  );
};

export default ActionUser;
