import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { Order } from "../../models/order.model";
import OrderApi from "../../services/order";
import { uploadImg } from "../../utils";
import Button from "../Button";
import OrderCard from "../Cards/OrderCard";
import ProductOrderCard from "../Cards/ProductOrderCard";

type ModalRefundProps = {
  open: boolean;
  handleHide: () => void;
  order: Order;
};

const ModalRefund: React.FC<ModalRefundProps> = ({
  open,
  handleHide,
  order,
}) => {
  const [files, setFiles] = useState<FileList>();
  const [desc, setDesc] = useState("");

  const { mutate, isLoading } = useMutation(OrderApi.report, {
    onSuccess(data, variables, context) {
      toast.success("Gửi yêu cầu thành công, vui lòng đợi hệ thống xét duyệt.");
      handleHide();
    },
    onError(error: any, variables, context) {
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  });

  const handleReport = async () => {
    if (!files || !desc) {
      toast.error("Vui lòng nhập đầy đủ");
      return;
    }
    swal({
      title: "Bạn có chắc chắn muốn gửi yêu cầu?",
      text: "Sau khi gửi yêu cầu sẽ phải đợi hệ thống xét duyệt!",
      icon: "warning",
      buttons: ["Hủy", "Gửi"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const images = await Promise.all(
          Array.from(files).map((item) => uploadImg(item))
        );
        mutate({ orderId: order.id, description: desc, images });
      }
    });
  };

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
            className="mt-1 block w-full rounded-sm border px-4 py-2 outline-none"
            placeholder="Vui lòng mô tả vấn đề"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            minLength={4}
            aria-multiline
            id="description"
          />
        </div>
        <div className="mt-4">
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Button
            text="Đóng"
            onClick={handleHide}
            className=" flex w-[150px] items-center justify-center rounded-sm bg-[#999] px-4 py-2 text-white"
          />
          <Button
            disabled={isLoading}
            text="Gửi yêu cầu"
            onClick={handleReport}
            className="flex w-[150px] items-center justify-center rounded-sm bg-primary px-4 py-2 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalRefund;
