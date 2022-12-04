export type IItemSidebarData = {
  id: number;
  name: string;
  idSlideBar: number;
  url: string;
};
const itemSidebarData: IItemSidebarData[] = [
  {
    id: 1,
    name: "Tất Cả Sản Phẩm",
    idSlideBar: 2,
    url: "/seller/product",
  },
  {
    id: 2,
    name: "Thêm Sản Phẩm",
    idSlideBar: 2,
    url: "/seller/product/new",
  },
  {
    id: 3,
    name: "Sản Phẩm Vi Phạm",
    idSlideBar: 2,
    url: "/seller/product/new",
  },
  {
    id: 4,
    name: "Tất Cả",
    idSlideBar: 1,
    url: "/seller",
  },
  {
    id: 5,
    name: "Đơn Hủy",
    idSlideBar: 1,
    url: "/seller/product/new",
  },
  {
    id: 6,
    name: "Trả Hàng/Hoàn Tiền",
    idSlideBar: 1,
    url: "/seller/product/new",
  },
  {
    id: 7,
    name: "Mã Giảm Giá Của Tôi",
    idSlideBar: 3,
    url: "/seller/portal/vouchers",
  },
  {
    id: 8,
    name: "Tạo Mã Giảm Giá",
    idSlideBar: 3,
    url: "/seller/portal/addVoucher",
  },
  {
    id: 9,
    name: "Doanh Thu",
    idSlideBar: 4,
    url: "/seller/product/new",
  },
  {
    id: 10,
    name: "Cài Đặt Thanh Toán",
    idSlideBar: 4,
    url: "/seller/product/new",
  },
  {
    id: 11,
    name: "Đánh Giá Shop",
    idSlideBar: 5,
    url: "/seller/portal/rating",
  },
  {
    id: 12,
    name: "Hồ Sơ Shop",
    idSlideBar: 5,
    url: "/seller/product/new",
  },
  {
    id: 14,
    name: "Danh Mục Của Shop",
    idSlideBar: 5,
    url: "/seller/portal/category",
  },
  {
    id: 15,
    name: "Địa Chỉ",
    idSlideBar: 6,
    url: "/seller/product/new",
  },
  {
    id: 16,
    name: "Tài Khoản",
    idSlideBar: 6,
    url: "/seller/product/new",
  },
];
export default itemSidebarData;
