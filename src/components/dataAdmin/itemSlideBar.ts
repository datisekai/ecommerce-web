export type IItemSidebarData = {
  id: number;
  name: string;
  idSlideBar: number;
  url: string;
};
const itemSidebarDataAdmin: IItemSidebarData[] = [
  {
    id: 1,
    name: "Tất Cả Sản Phẩm",
    idSlideBar: 2,
    url: "/admin/product",
  },
  {
    id: 3,
    name: "Sản Phẩm Vi Phạm",
    idSlideBar: 2,
    url: "/admin/product/new",
  },
  {
    id: 4,
    name: "Tất Cả",
    idSlideBar: 1,
    url: "/admin",
  },
  {
    id: 6,
    name: "Trả Hàng/Hoàn Tiền",
    idSlideBar: 1,
    url: "/admin/product/new",
  },
  {
    id: 8,
    name: "Mã giảm giá",
    idSlideBar: 3,
    url: "/admin/portal/vouchers",
  },
  {
    id: 10,
    name: "Tất cả người dùng",
    idSlideBar: 4,
    url: "/admin/user",
  },
  {
    id: 14,
    name: "Tất cả Ngành hàng",
    idSlideBar: 5,
    url: "/admin/portal/category",
  },
  {
    id: 15,
    name: "Thống kê",
    idSlideBar: 6,
    url: "/admin/Turnover",
  },
  {
    id: 16,
    name: "Phân quyền",
    idSlideBar: 7,
    url: "/admin/permission/privilege",
  },
  {
    id: 17,
    name: "Thêm nhóm quyền",
    idSlideBar: 7,
    url: "/admin/permission/addprivilegegroup",
  },
];
export default itemSidebarDataAdmin;
