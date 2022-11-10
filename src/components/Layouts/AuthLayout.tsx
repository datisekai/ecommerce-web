import { getCookie } from "cookies-next";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import Children from "../../models/Children";
import { setToken, setUser } from "../../redux/slices/user";
import userApi from "../../services/user";

interface AuthLayoutProps extends Children {
  token?: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, token }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getMyInfo = async () => {
      const user = await userApi.me();
      dispatch(setUser(user));
    };
    if (token) {
      dispatch(setToken(token));
      getMyInfo();
    }
  }, [token]);

  return <div>{children}</div>;
};

export default AuthLayout;
