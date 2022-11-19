import axios, { AxiosResponse } from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { API_URL } from "../config";
import { store } from "../redux";
const axiosClient = axios.create({
  baseURL: API_URL,
});

axiosClient.interceptors.request.use((config) => {
  if (config.url?.indexOf("login") !== -1) {
    return config;
  }

  if (!config?.headers) {
    throw new Error(
      `Expected 'config' and 'config.headers' not to be undefined`
    );
  }

  const token = getCookie('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response.status === 401) {
      deleteCookie("token");
      setCookie('token','')
     if(typeof window !== "undefined"){
      window.location.href = "/login";
     }
    }
    return Promise.reject(error.response.data);
  }
);

export default axiosClient;
