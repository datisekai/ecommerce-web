import axiosClient from "../config/axiosClient";
import { Action } from "../models/action.model";

type ActionApiType = {
  getAction: (token: string) => Promise<Action[]>;
};

const ActionApi: ActionApiType = {
  getAction: async (token) => {
    const result = await axiosClient.get("/action", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  },
};

export default ActionApi;
