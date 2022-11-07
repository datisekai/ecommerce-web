import React, { useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import WidthLayout from "../components/Layouts/WidthLayout";
import { FaFreeCodeCamp } from "react-icons/fa";
import CartList from "../components/Lists/CartList";
import PaymentCart from "../components/Popup/PaymentCart";
import VoucherModal from "../components/Popup/VoucherModal";
import Meta from "../components/Meta";

const Cart = () => {
  const [showModalVoucher, setShowModalVoucher] = useState(false);
  return (
    <>
      <Meta
        image="https://glints.com/vn/blog/wp-content/uploads/2022/10/chie%CC%82%CC%81n-di%CC%A3ch-truye%CC%82%CC%80n-tho%CC%82ng-cu%CC%89a-shopee.jpeg"
        description="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
        title="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
      />
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
            <CartList />
            <CartList />
            <CartList />
            <PaymentCart onShowVoucher={() => setShowModalVoucher(true)} />
          </div>
        </WidthLayout>
        <VoucherModal
          open={showModalVoucher}
          onHide={() => setShowModalVoucher(false)}
        />
      </MainLayout>
    </>
  );
};

export default Cart;
