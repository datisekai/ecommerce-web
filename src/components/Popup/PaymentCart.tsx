import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import swal from "sweetalert";
import { formatPrices } from "../../utils";
import Button from "../Button";
import WidthLayout from "../Layouts/WidthLayout";

type PaymentCartProps = {
  onShowVoucher: () => void;
  total: number;
  length: number;
};

const PaymentCart: FC<PaymentCartProps> = ({
  onShowVoucher,
  total,
  length,
}) => {
  const router = useRouter();

  const handleNavigate = () => {
    if (length <= 0) {
      swal("Thông báo", "Vui lòng chọn sản phẩm thanh toán", "warning");
      return;
    }

    router.push("/checkout");
  };

  return (
    <div className="sticky bottom-0 right-0 left-0 mt-3">
      <WidthLayout>
        <div className="mx-auto rounded-sm border bg-white py-3 shadow-md  ">
          <div className="flex items-center justify-end border-b py-3 px-6">
            <div className="flex w-[50%] items-center justify-between">
              <div className="flex items-center">
                <IoNewspaperOutline className="text-[18px] text-primary" />
                <span className="ml-1 text-[16px]">Shopee Voucher</span>
              </div>
              <p
                onClick={onShowVoucher}
                className="cursor-pointer capitalize text-blue-500"
              >
                Chọn Voucher
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="ml-1 text-[16px]">
                  Tổng thanh toán {`(${length} Sản Phẩm): `}
                  <span className="text-[20px] text-primary">
                    {formatPrices(total)}
                  </span>
                </span>
              </div>
            </div>
            <Button
              onClick={handleNavigate}
              className="rounded-sm bg-primary px-10 py-3 text-white transition-all hover:opacity-90"
              text="Mua Hàng"
            />
          </div>
        </div>
      </WidthLayout>
    </div>
  );
};

export default PaymentCart;
