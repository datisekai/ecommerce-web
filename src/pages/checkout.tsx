import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { GiPositionMarker } from "react-icons/gi";
import { IoNewspaperOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import Button from "../components/Button";
import CheckoutCard from "../components/Cards/CheckoutCard";
import AuthLayout from "../components/Layouts/AuthLayout";
import MainLayout from "../components/Layouts/MainLayout";
import WidthLayout from "../components/Layouts/WidthLayout";
import Meta from "../components/Meta";
import AddressModal from "../components/Popup/AddressModal";
import VoucherModal from "../components/Popup/VoucherModal";
import { useAppSelector } from "../hooks/reduxHooks";
import { Contact } from "../models/contact.model";
import { setCarts, setCheckout } from "../redux/slices/cart";
import OrderApi from "../services/order";
import { formatPrices } from "../utils";

const Checkout = (props) => {
  const [open, setOpen] = useState(false);

  const { checkout, carts } = useAppSelector(state => state.cart)

  const [description, setDescription] = useState('')
  const { user } = useAppSelector(state => state.user);

  const dispatch = useDispatch();
  const defaultAddress: Contact | undefined = useMemo(() => {
    return user?.contacts?.find((item: Contact) => item.active === true);
  }, [user])

  const feeTransport = 20000;

  const total = useMemo(() => {
    return checkout.reduce(
      (pre, cur) =>
        pre + ((cur.sku.price * (100 - cur.sku.discount)) / 100) * cur.qty,
      0
    );
  }, [checkout])

  const totalAll = useMemo(() => {
    return total + feeTransport
  }, [total, feeTransport])

  const router = useRouter();

  const { mutate, isLoading } = useMutation(OrderApi.create, {
    onSuccess: (data, variable) => {
    
      dispatch(setCheckout([]))
      toast.success("Tạo đơn hàng thành công");
      router.push('/user/purchase')

    },
    onError: (error: any) => {
      console.log(error);
      error && error.message && toast.error("Vui lòng thử lại")
    }
  })

  const handleOrder = () => {
    swal({
      title: "Bạn có chắc chắn muốn đặt hàng?",
      icon: "warning",
      buttons: ["Hủy", "OK"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          mutate({
            skus: checkout.map(item => {
              return {
                price: item.sku.price,
                qty: item.qty,
                discount: item.sku.discount,
                id: item.skuId
              }
            }),
            cartId: checkout[0].cartId,
            description
          })
        }
      });
  }

  console.log(checkout)

  return (
    <>
      <Meta
        image="https://glints.com/vn/blog/wp-content/uploads/2022/10/chie%CC%82%CC%81n-di%CC%A3ch-truye%CC%82%CC%80n-tho%CC%82ng-cu%CC%89a-shopee.jpeg"
        description="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
        title="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
      />
      <AuthLayout>
        <MainLayout>
          <WidthLayout>
            <div className="mx-auto max-w-[calc(100%-16px)] py-4">
              <div className="rounded-sm border-t-[5px] border-secondary bg-white px-6 py-4 shadow-md">
                <div className="flex items-center">
                  <GiPositionMarker className="text-[20px] text-primary" />
                  <span className="ml-2 text-[17px] capitalize text-primary">
                    Địa chỉ nhận hàng
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="mt-4 flex items-center">
                    <h2 className="text-[17px] font-semibold">
                      {defaultAddress?.name} <span className="text-primary">{defaultAddress?.phone}</span>
                    </h2>
                    <p className="ml-4 text-[17px] line-clamp-1">
                      {defaultAddress?.address}
                    </p>
                    <span className="ml-2 rounded-sm border border-primary p-1 text-[12px] capitalize text-primary ">
                      Mặc định
                    </span>
                  </div>
                  <Button
                    onClick={() => router.push('/user/address?redirect=checkout')}
                    text="Thay đổi"
                    className="text-[15px] capitalize text-blue-500"
                  />
                </div>
              </div>
              <div className=" mt-3 rounded-sm bg-white px-6 py-4 shadow-md">
                <div className="flex items-center justify-between">
                  <h2 className="w-[50%] text-[17px]">Sản phẩm</h2>
                  <div className="grid w-[50%] grid-cols-3 gap-4">
                    <p className="text-[#666]">Đơn giá</p>
                    <p className="text-[#666]">Số lượng</p>
                    <p className="text-[#666]">Thành tiền</p>
                  </div>
                </div>
                <div className="mt-2">
                  {checkout?.map(item => <CheckoutCard key={item.id} {...item} />)}
                </div>
                <div className="flex items-center justify-end border-t border-dotted py-4">
                  <div className="flex w-[50%] items-center">
                    <IoNewspaperOutline className="text-[18px] text-primary" />
                    <span className="ml-1 text-[16px]">Shopee Voucher</span>
                  </div>
                  <p
                    onClick={() => setOpen(true)}
                    className="cursor-pointer capitalize text-blue-500"
                  >
                    Chọn voucher
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-dotted py-4">
                  <div className="flex w-[50%] items-center">
                    <label htmlFor="messageToSeller" className="w-[15%]">
                      Lời nhắn
                    </label>
                    <input
                      type="text"
                      name=""
                      value={description}
                      onChange={(e: any) => setDescription(e.target.value)}
                      id="messageToSeller"
                      className="ml-2 w-full rounded-none border  px-4 py-2 outline-none "
                      placeholder="Lưu ý cho Người bán..."
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-end">
                    <p className="text-[#666]">
                      Tổng số tiền ({checkout.length} sản phẩm):{" "}
                      <span className="text-[20px] text-primary">
                        {formatPrices(total)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 rounded-sm  bg-white px-6 py-4 shadow-md">
                <div className="flex items-center border-b pb-4">
                  <h2 className="text-[17px]">Phương thức thanh toán</h2>
                  <p className="ml-2 rounded-sm border border-primary px-4 py-2 text-primary">
                    Thanh toán khi nhận hàng
                  </p>
                </div>
                <div className="flex w-full justify-end py-4">
                  <div>
                    <div className="grid grid-cols-2 gap-6 text-[#666]">
                      <p>Tổng tiền hàng</p>
                      <p>{formatPrices(total)}</p>
                    </div>
                    <div className=" mt-2 grid grid-cols-2 gap-6 text-[#666]">
                      <p>Phí vận chuyển</p>
                      <p>{formatPrices(feeTransport)}</p>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-6 text-[#666]">
                      <p>Tổng thanh toán</p>
                      <p>{formatPrices(totalAll)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <p>
                    Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo Điều
                    khoản Shopee
                  </p>
                  <Button
                    text="Đặt hàng"
                    onClick={handleOrder}
                    className="flex w-[200px] items-center justify-center rounded-sm bg-primary px-6 py-2 capitalize text-white transition-all hover:opacity-90"
                  />
                </div>
              </div>
            </div>
          </WidthLayout>
          <VoucherModal open={open} onHide={() => setOpen(false)} />
        </MainLayout>
      </AuthLayout>
    </>
  );
};

export default Checkout;
