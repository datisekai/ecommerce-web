import { setCookie } from "cookies-next";
import axiosClient from "../config/axiosClient";

type userData = { phone: string; password: string };

type LoginApiProps = {
  loginSocial: (token: string) => Promise<string>;
  login: (data: userData) => Promise<string>;
  signUp: (data: userData) => Promise<string>;
};

const LoginApi: LoginApiProps = {
  loginSocial: async (token: string) => {
    try {
      const res = await axiosClient.post(`/login-social`, { token });
      return res.data.token;
    } catch (error) {
      console.log(error);
    }
  },
  login: async (data: userData) => {
    const res = await axiosClient.post("/login", data);
    return res.data.token;
  },
  signUp: async (data: userData) => {
    const res = await axiosClient.post("/register", data);
    return res.data.token;
  },
};

export default LoginApi;
