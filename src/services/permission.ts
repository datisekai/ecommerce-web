import axiosClient from "../config/axiosClient";
import { Permission } from "../models/permission.model";

type PermissionApiType = {
  getPermisison: () => Promise<Permission[]>;
  getPermisionServer: (token: string) => Promise<Permission[]>;
  addPermission: (name: string) => Promise<Permission>;
};

const PermissionApi: PermissionApiType = {
  getPermisison: async () => {
    const result = await axiosClient.get("/permission");
    return result.data;
  },
  addPermission: async (name) => {
    const result = await axiosClient.post("/permission", {
      name,
    });
    return result.data;
  },
  getPermisionServer: async (token) => {
    const result = await axiosClient.get("/permission", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  },
};

export default PermissionApi;
