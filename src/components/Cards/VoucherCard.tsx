import React from "react";

const VoucherCard = () => {
  return (
    <label
      htmlFor="voucher"
      className="mt-2 flex items-center justify-between border-b bg-bgPrimary px-4 py-3 shadow-md last:border-none"
    >
      <div>
        <h4>Tất cả hình thức thanh toán</h4>
        <p className="mt-2 border border-primary p-1 text-[14px] text-primary">
          Đơn hàng từ 50k
        </p>
      </div>
      <div>
        <input type="radio" name="voucher" className="h-4 w-4" id="voucher" />
      </div>
    </label>
  );
};

export default VoucherCard;
