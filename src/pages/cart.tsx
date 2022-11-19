import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaFreeCodeCamp } from "react-icons/fa";
import AuthLayout from "../components/Layouts/AuthLayout";
import MainLayout from "../components/Layouts/MainLayout";
import WidthLayout from "../components/Layouts/WidthLayout";
import CartList from "../components/Lists/CartList";
import Meta from "../components/Meta";
import PaymentCart from "../components/Popup/PaymentCart";
import VoucherModal from "../components/Popup/VoucherModal";
import { useAppSelector } from "../hooks/reduxHooks";
import { Cart, CartDetail } from "../models/cart.model";

type CartProps = {};

const Cart: NextPage<CartProps> = () => {
  const [showModalVoucher, setShowModalVoucher] = useState(false);
  // const { data: carts, isLoading } = useQuery(["cart"], CartApi.view);
  const { carts } = useAppSelector((state) => state.cart);
  const [skuCheckout, setSkuCheckout] = useState<CartDetail[]>([]);

  const total = useMemo(() => {
    let newCarts = [];

    // carts?.forEach((element: Cart) => {
    //   newCarts = [...newCarts, ...element.cartDetails];
    // });

    return skuCheckout.reduce(
      (pre, cur) =>
        pre + ((cur.sku.price * (100 - cur.sku.discount)) / 100) * cur.qty,
      0
    );
  }, [skuCheckout]);

  const handleAddListSku = (currentCart: Cart) => {
    const isExist = skuCheckout.some((item) => {
      return item.cartId === currentCart.id;
    });
    if (!isExist) {
      carts.forEach((item) => {
        if (item.id === currentCart.id) {
          setSkuCheckout([...item.cartDetails]);
        }
      });
    } else {
      setSkuCheckout([]);
    }
  };

  const handleAddSku = (sku: CartDetail) => {
    if (skuCheckout.length === 0) {
      setSkuCheckout([sku]);
    } else {
      const isExistCart = skuCheckout.some(
        (item) => item.cartId === sku.cartId
      );

      if (isExistCart) {
        const isExistSku = skuCheckout.some((item) => item.skuId === sku.skuId);
        if (isExistSku) {
          setSkuCheckout(
            skuCheckout.filter((item) => item.skuId !== sku.skuId)
          );
        } else {
          setSkuCheckout([...skuCheckout, sku]);
        }
      } else {
        return toast.error(
          "Chỉ được thanh toán duy nhất một shop ở một lần giao dịch"
        );
      }
    }
  };

  useEffect(() => {
    console.log("skuCheckout", skuCheckout);
  }, [skuCheckout]);

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
            <div className="relative mx-auto w-full max-w-[calc(100%-16px)] py-4">
              <div className="flex items-center rounded-sm border border-yellow-300 bg-white px-6 py-3 shadow-sm">
                <FaFreeCodeCamp className="text-[20px] text-blue-500" />
                <p className="ml-2 text-[14px]">
                  Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận
                  chuyển bạn nhé!
                </p>
              </div>
              <div className="mt-4 flex items-center  justify-between rounded-sm bg-white px-6 py-4 shadow-sm">
                <h4 className="w-[50%] text-[17px] text-[#666]">Sản phẩm</h4>
                <div className="flex flex-1 items-center justify-between ">
                  <h5 className="text-[16px] text-[#666]">Đơn giá</h5>
                  <h5 className="ml-4 text-[16px] text-[#666]">Số lượng</h5>
                  <h5 className="ml-4 text-[16px] text-[#666]">Số tiền</h5>
                  <h5 className="ml-4 text-[16px] text-[#666]">Thao tác</h5>
                </div>
              </div>
              {carts?.map((item: Cart, index: number) => (
                <CartList
                  skuCheckout={skuCheckout}
                  onChangeSku={handleAddSku}
                  onChange={handleAddListSku}
                  key={item.id}
                  {...item}
                />
              ))}
              <PaymentCart
                length={skuCheckout.length}
                total={total}
                onShowVoucher={() => setShowModalVoucher(true)}
              />
            </div>
          </WidthLayout>
          <VoucherModal
            open={showModalVoucher}
            onHide={() => setShowModalVoucher(false)}
          />
        </MainLayout>
      </AuthLayout>
    </>
  );
};

export default Cart;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const token = req.cookies["token"];
  try {
    if (token) {
      return {
        props: {},
      };
    }

    return {
      props: {},
      redirect: {
        destination: "/  ",
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
