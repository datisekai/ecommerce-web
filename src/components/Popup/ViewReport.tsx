import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Order } from "../../models/order.model";
import Button from "../Button";
import ProductOrderCard from "../Cards/ProductOrderCard";

type ViewReportProps = {
  open: boolean;
  handleHide: () => void;
  order: Order;
};

const ViewReport: FC<ViewReportProps> = ({ open, handleHide, order }) => {
  return (
    <div className={`${open ? "flex" : "hidden"}`}>
      <div
        className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.6)]"
        onClick={() => {
          handleHide();
        }}
      />
      <div
        className={`animateOpacity fixed top-[50%] left-[50%] z-[200] w-[500px] translate-x-[-50%] translate-y-[-50%] select-none rounded-sm bg-white px-6 py-4 shadow-md transition-all ${
          !open && "hidden"
        }`}
      >
        <h2 className="text-[17px]">Yêu cầu hoàn tiền</h2>
        <div className="mt-2 max-h-[200px] overflow-y-scroll">
          {order?.orderDetails.map((item) => (
            <ProductOrderCard key={item.id} {...item} />
          ))}
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="text-[16px]">
            Mô tả
          </label>
          <textarea
            readOnly={true}
            className="mt-1 block w-full rounded-sm border px-4 py-2 outline-none"
            placeholder="Vui lòng mô tả vấn đề"
            value={order?.orderReports?.description}
            minLength={4}
            aria-multiline
            id="description"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center">
          {order?.orderReports?.orderReportImages.map((item) => (
            <LazyLoadImage
              src={item.image}
              key={item.id}
              className="ml-1  w-[100px]  rounded-sm first:ml-0"
            />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-end">
          <Button
            text="Đóng"
            onClick={handleHide}
            className=" flex w-[150px] items-center justify-center rounded-sm bg-[#999] px-4 py-2 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
