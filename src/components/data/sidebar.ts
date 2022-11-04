import { IconType } from "react-icons/lib";
import { RiBillLine } from "react-icons/ri";
import { BsBoxSeam } from "react-icons/bs";
import { BsTag } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
export type ISidebarData = {
  id: number;
  name: string;
  icon: IconType;
};
const sidebarData: ISidebarData[] = [
  {
    id: 1,
    name: "Quản Lý Sản Phẩm",
    icon: BsBoxSeam,
  },
  {
    id: 2,
    name: "Quản Lý Đơn Hàng",
    icon: RiBillLine,
  },
  {
    id: 3,
    name: "Kênh Marketing",
    icon: BsTag,
  },
  {
    id: 4,
    name: "Tài Chính",
    icon: BiWallet,
  },
  {
    id: 5,
    name: "Quản Lý Shop",
    icon: AiOutlineShop,
  },
  {
    id: 6,
    name: "Thiết Lập Shop",
    icon: AiOutlineSetting,
  },
];

export default sidebarData;
