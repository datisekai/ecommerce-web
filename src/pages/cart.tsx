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
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Cart, CartDetail } from "../models/cart.model";
import { setCheckout } from "../redux/slices/cart";

const Cart = () => {
  const [showModalVoucher, setShowModalVoucher] = useState(false);
  // const { data: carts, isLoading } = useQuery(["cart"], CartApi.view);
  const { carts, checkout } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const total = useMemo(() => {
    return checkout.reduce(
      (pre, cur) =>
        pre + ((cur.sku.price * (100 - cur.sku.discount)) / 100) * cur.qty,
      0
    );
  }, [checkout]);

  const handleAddListSku = (currentCart: Cart) => {
    const isExist = checkout.some((item) => {
      return item.cartId === currentCart.id;
    });
    if (!isExist) {
      carts.forEach((item) => {
        if (item.id === currentCart.id) {
          dispatch(setCheckout([...item.cartDetails]));
        }
      });
    } else {
      dispatch(setCheckout([]));
    }
  };

  const handleAddSku = (sku: CartDetail) => {
    if (checkout.length === 0) {
      dispatch(setCheckout([sku]));
    } else {
      const isExistCart = checkout.some((item) => item.cartId === sku.cartId);

      if (isExistCart) {
        const isExistSku = checkout.some((item) => item.skuId === sku.skuId);
        if (isExistSku) {
          dispatch(
            setCheckout(checkout.filter((item) => item.skuId !== sku.skuId))
          );
        } else {
          dispatch(setCheckout([...checkout, sku]));
        }
      } else {
        return toast.error(
          "Ch??? ???????c thanh to??n duy nh???t m???t shop ??? m???t l???n giao d???ch"
        );
      }
    }
  };

  return (
    <>
      <Meta
        image="https://glints.com/vn/blog/wp-content/uploads/2022/10/chie%CC%82%CC%81n-di%CC%A3ch-truye%CC%82%CC%80n-tho%CC%82ng-cu%CC%89a-shopee.jpeg"
        description="Shopee Vi???t Nam | Mua v?? B??n Tr??n ???ng D???ng Di ?????ng Ho???c Website"
        title="Shopee Vi???t Nam | Mua v?? B??n Tr??n ???ng D???ng Di ?????ng Ho???c Website"
      />

      <AuthLayout>
        <MainLayout>
          <WidthLayout>
            <div className="relative mx-auto w-full max-w-[calc(100%-16px)] py-4">
              <div className="flex items-center rounded-sm border border-yellow-300 bg-white px-6 py-3 shadow-sm">
                <FaFreeCodeCamp className="text-[20px] text-blue-500" />
                <p className="ml-2 text-[14px]">
                  Nh???n v??o m???c M?? gi???m gi?? ??? cu???i trang ????? h?????ng mi???n ph?? v???n
                  chuy???n b???n nh??!
                </p>
              </div>
              <div className="mt-4 flex items-center  justify-between rounded-sm bg-white px-6 py-4 shadow-sm">
                <h4 className="w-[50%] text-[17px] text-[#666]">S???n ph???m</h4>
                <div className="flex flex-1 items-center justify-between ">
                  <h5 className="text-[16px] text-[#666]">????n gi??</h5>
                  <h5 className="ml-4 text-[16px] text-[#666]">S??? l?????ng</h5>
                  <h5 className="ml-4 text-[16px] text-[#666]">S??? ti???n</h5>
                  <h5 className="ml-4 text-[16px] text-[#666]">Thao t??c</h5>
                </div>
              </div>
              {carts?.map((item: Cart, index: number) => (
                <CartList
                  onChangeSku={handleAddSku}
                  onChange={handleAddListSku}
                  key={item.id}
                  {...item}
                />
              ))}
              <PaymentCart
                length={checkout.length}
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
