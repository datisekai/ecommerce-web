import axiosClient from "../config/axiosClient";

const userApi = {
  me: async () => {
    try {
      const res = await axiosClient.get("/user/me");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  update: async (data: any) => {
    const result = await axiosClient.put("/user/info", data);
    return result.data;
  },
  changePassword: async (data: { password: string; newPassword: string }) => {
    const result = await axiosClient.patch("/user/info", data);
    return result.data;
  },
};

export default userApi;
