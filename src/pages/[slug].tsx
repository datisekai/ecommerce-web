import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Divider from "../components/Divider";
import FilterStarItem from "../components/Filters/FilterStarItem";
import MainLayout from "../components/Layouts/MainLayout";
import WidthLayout from "../components/Layouts/WidthLayout";
import OptionVariant from "../components/OptionVariant";
import { formatPrices } from "../utils";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Button from "../components/Button";
import { BsCartPlus } from "react-icons/bs";
import ShopCard from "../components/Cards/ShopCard";
import ReviewCard from "../components/Cards/ReviewCard";

const detail = {
  id: 2,
  slug: "day-djeo-djong-ho-chat-lieu-da-bo-that-100percent-thich-hop-cho-apple-watch-7-6-se-5-4-42mm-3",
  name: "Dây đeo đồng hồ chất liệu da bò thật 100% thích hợp cho Apple Watch 7 6 SE 5 4 42Mm 3",
  description: "Thời gian giao hàng dự kiến cho sản phẩm này là từ 7-9 ngày",
  categoryId: 1,
  sellerId: "cla19bf6s00007k0wesqyaxrs",
  createdAt: "2022-11-02T14:50:23.000Z",
  image: "https://cde",
  seller: {
    id: "cla19bf6s00007k0wesqyaxrs",
    name: "Đạt Lý Thành (3120410115)",
    email: "datly030102@gmail.com",
    nameShop: null,
    date: null,
    image:
      "https://lh3.googleusercontent.com/a/ALm5wu2ZxN4etg3g-CkSFP_moGf7Eo1FlbtdesspuwsvMA=s96-c",
  },
  variants: [
    {
      id: 3,
      name: "Band Width",
      productId: 2,
      variantOptions: [
        {
          id: 7,
          name: "For 38/40/41mm",
          variantId: 3,
          productId: 2,
        },
        {
          id: 8,
          name: "For 42/44/45mm",
          variantId: 3,
          productId: 2,
        },
      ],
    },
    {
      id: 4,
      name: "Band Color",
      productId: 2,
      variantOptions: [
        {
          id: 4,
          name: "01",
          variantId: 4,
          productId: 2,
        },
        {
          id: 5,
          name: "17",
          variantId: 4,
          productId: 2,
        },
        {
          id: 6,
          name: "05",
          variantId: 4,
          productId: 2,
        },
      ],
    },
  ],
};

const DetailSku = () => {
  return (
    <MainLayout>
      <WidthLayout>
        <div className="mx-auto max-w-[calc(100%-16px)] py-6">
          <div className="flex flex-col rounded-sm bg-white p-6 shadow-sm lg:flex-row">
            <div className="w-full lg:w-[40%]">
              <LazyLoadImage
                src="https://cf.shopee.vn/file/100a8907f73cf6fbbd7747b4a1e004fe"
                alt=""
                className="aspect-[1/1] w-full rounded-sm"
              />
              <div className="mt-1 grid grid-cols-5 gap-1">
                {[1, 2, 3, 4, 5].map((item: any) => (
                  <LazyLoadImage
                    key={item}
                    src="https://cf.shopee.vn/file/100a8907f73cf6fbbd7747b4a1e004fe"
                    alt=""
                    className="aspect-[1/1] w-full rounded-sm"
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 w-full pl-0 lg:mt-0 lg:w-[60%] lg:pl-6">
              <h1 className="text-[17px] lg:text-[19px]">
                Áo kiểu tay dài họa tiết hoa xinh xắn thời trang cho nữ
              </h1>
              <div className="mt-2 flex items-center">
                <FilterStarItem
                  color="text-primary"
                  star={4.6}
                  isStar={true}
                  isText={false}
                />
                <Divider width="2px" height="20px" mx="16px" my="0px" />
                <div className="flex items-center">
                  <span className="mr-2 text-[18px] underline">115</span>
                  <span className="text-[16px] capitalize text-[#666]">
                    Đánh giá
                  </span>
                </div>
                <Divider width="2px" height="20px" mx="16px" my="0px" />
                <div className="flex items-center">
                  <span className="mr-2 text-[18px] ">324</span>
                  <span className="text-[16px] capitalize text-[#666]">
                    Đã bán
                  </span>
                </div>
              </div>
              <div className="mt-6 rounded-sm bg-bgPrimary p-4">
                <span className="text-[25px] text-primary lg:text-[30px]">
                  {formatPrices(89000)}
                </span>
              </div>

              <div className="mt-6 flex items-center">
                <span className="w-[20%] text-[17px] capitalize text-[#666]">
                  Mã giảm giá của shop
                </span>
                <div className="grid grid-cols-3 gap-1">
                  <div className="cursor-pointer rounded-sm bg-red-200 p-1">
                    <span className="text-[17px] text-primary">11% Giảm</span>
                  </div>
                </div>
              </div>

              {detail.variants.map((item: any, index: number) => {
                return (
                  <div
                    className="mt-6 flex items-center"
                    key={`variant-${item.id}`}
                  >
                    <span className="w-[20%] text-[17px] capitalize text-[#666]">
                      {item.name}
                    </span>
                    <div className="grid flex-1 grid-cols-3 gap-2 lg:grid-cols-5">
                      {item.variantOptions.map(
                        (element: any, index: number) => {
                          return (
                            <OptionVariant
                              key={`variantOption-${element.id}`}
                              checked={true}
                              text={element.name}
                            />
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="mt-6 flex items-center">
                <span className="w-[20%] text-[17px] capitalize text-[#666]">
                  Số lượng
                </span>
                <div className="flex flex-1 items-center">
                  <div className="flex items-center rounded-sm border">
                    <AiOutlineMinus className="mx-2 my-2 cursor-pointer" />
                    <input
                      type="text"
                      className="h-full w-[50px] text-center text-[17px] outline-none"
                      value={1}
                    />
                    <AiOutlinePlus className="mx-2 my-2 cursor-pointer " />
                  </div>
                  <span className="ml-4 text-[15px] text-[#666]">
                    4978 sản phẩm có sẵn
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <Button
                  text="Thêm vào giỏ hàng"
                  startIcon={BsCartPlus}
                  classNameStarIcon="text-[20px] mr-2"
                  className="rounded-sm border border-primary bg-[rgba(255,197,178,.181)] px-6 py-3 text-[17px] capitalize text-primary shadow-sm transition-all hover:opacity-90"
                />
                <Button
                  text="Mua ngay"
                  className="ml-2 rounded-sm border border-primary bg-primary px-6 py-3 text-[17px] capitalize text-white shadow-sm transition-all hover:opacity-90"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <ShopCard />
          </div>
          <div className="mt-4 rounded-sm bg-white p-4">
            <h3 className="text-[17px] uppercase">Mô tả sản phẩm</h3>
            <p className="mt-4 text-justify" style={{ lineHeight: 1.5 }}>
              MẸO NHỎ GIÚP SỬ DỤNG VÀ BẢO QUẢN QUẦN ÁO - Sản phẩm mới, khách
              hàng nên giặt tay ở lần giặt đầu để tránh lem màu sang quần áo
              khác - Khi giặt và phơi, nên lộn mặt trái để đảm bảo độ bền của
              màu vải - Không nên giặt chung với đồ trắng hoặc đồ tối màu QUYỀN
              LỢI CỦA KHÁCH HÀNG TẠI NGA VIỆT SHOP - Mua sản phẩm đúng với 100%
              mô tả - Mọi thắc mắc về sản phẩm được giải đáp, tư vấn kỹ càng
              trước khi chốt đơn - Giao hàng nhanh, hàng được đóng gói và giao
              vận chuyển ngay sau khi đặt hàng thành công - Chính sách đổi trả
              hàng/hoàn tiền luôn ưu tiên trải nghiệm của khách hàng - Giao
              hàng, hỗ trợ COD toàn quốc
            </p>
          </div>
          <div className="mt-4 rounded-sm bg-white p-4">
            <h3 className="text-[17px] uppercase">Đánh giá sản phẩm</h3>
            <div className="mt-4 flex items-center rounded-sm bg-orange-100 p-6">
              <div>
                <span className="text-[30px] text-primary">4.7</span>
                <span className="pl-1 text-[20px] text-primary">trên 5</span>
                <FilterStarItem
                  star={4.4}
                  isText={false}
                  color="text-primary"
                />
              </div>
              <div className="grid flex-1 grid-cols-3 gap-2  pl-6 lg:grid-cols-5">
                {[
                  "Tất cả",
                  "5 Sao ",
                  "4 Sao ",
                  "3 Sao ",
                  "2 Sao ",
                  "1 Sao ",
                  "Có hình ảnh",
                ].map((item: any) => (
                  <button
                    key={item}
                    className="border bg-white px-4 py-2 capitalize shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </div>
          </div>
        </div>
      </WidthLayout>
    </MainLayout>
  );
};

export default DetailSku;
