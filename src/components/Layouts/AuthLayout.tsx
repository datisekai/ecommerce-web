import { getCookie, setCookie } from "cookies-next";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import Children from "../../models/Children";
import { setCarts } from "../../redux/slices/cart";
import { setToken, setUser } from "../../redux/slices/user";
import CartApi from "../../services/cart";
import userApi from "../../services/user";

interface AuthLayoutProps extends Children {
  token?: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, token }) => {
  const dispatch = useDispatch();
  const tokenCookie = getCookie("token");
  useEffect(() => {
    const getMyInfo = async () => {
      const user = await userApi.me();
      dispatch(setUser(user));
    };

    const getMyCart = async () => {
      const cart = await CartApi.view();
      dispatch(setCarts(cart));
    };

    if (tokenCookie) {
      dispatch(setToken(token));
      getMyInfo();
      getMyCart();
    }
  }, [tokenCookie]);

  return <div>{children}</div>;
};

export default AuthLayout;
