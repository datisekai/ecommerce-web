import axiosClient from "../config/axiosClient";

const SetAuthorizedApi = {
  setData: async (data: any) => {
    const result = await axiosClient.put(
      `/set-authorized?perId=${data.perId}`,
      { ...data, perId: undefined }
    );
    return result.data;
  },
};

export default SetAuthorizedApi;
