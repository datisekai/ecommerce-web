import { IconType } from "react-icons/lib";
import { RiBillLine } from "react-icons/ri";
import { BsBoxSeam } from "react-icons/bs";
import { BsTag } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";
export type ISidebarData = {
  id: number;
  name: string;
  icon: IconType;
};
const sidebarDataAdmin: ISidebarData[] = [
  {
    id: 1,
    name: "Quản Lý Đơn Hàng",
    icon: BsBoxSeam,
  },
  {
    id: 2,
    name: "Quản Lý Sản Phẩm",
    icon: RiBillLine,
  },
  {
    id: 3,
    name: "Quản lý mã giảm giá",
    icon: BsTag,
  },
  {
    id: 4,
    name: "Quản lý người dùng",
    icon: BiWallet,
  },
  {
    id: 5,
    name: "Quản Lý ngành hàng",
    icon: AiOutlineShop,
  },
  {
    id: 6,
    name: "Thống kê",
    icon: AiOutlineSetting,
  },
  {
    id: 7,
    name: "Phân quyền",
    icon: BsFillKeyFill,
  },
];

export default sidebarDataAdmin;
