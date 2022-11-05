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
};

export default userApi;
