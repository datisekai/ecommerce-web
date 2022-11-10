import axiosClient from "../config/axiosClient";
import { CategoryModel } from "../models/category.model";

type CategoryApiProps = {
  getCategory: () => Promise<CategoryModel[]>;
};

const CategoryApi: CategoryApiProps = {
  getCategory: async () => {
    const result = await axiosClient.get("/category/view");
    return result.data;
  },
};

export default CategoryApi;
