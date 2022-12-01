import React, { FC } from "react";
import Button from "../Button";
import { AiOutlineShop, AiOutlineFileProtect } from "react-icons/ai";
import ProductOrderCard from "./ProductOrderCard";
import { formatPrices } from "../../utils";
import { Order } from "../../models/order.model";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import OrderApi from "../../services/order";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import swal from "sweetalert";

interface OrderCardProps extends Order {
  handleOpen: () => void;
  handleOpenReport: () => void;
  handleOpenComment: () => void;
}

const OrderCard: FC<OrderCardProps> = ({
  handleOpen,
  orderReports,
  createdAt,
  description,
  id,
  isPay,
  orderDetails,
  seller,
  sellerId,
  status,
  statusId,
  total,
  updatedAt,
  userId,
  handleOpenReport,
  handleOpenComment,
}) => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(OrderApi.delivered, {
    onSuccess: (data) => {
      toast.success("Cập nhật thành công");
      router.push("/user/purchase?type=3");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Vui lòng thử lại");
    },
  });

  const handleDelivered = () => {
    swal({
      title: "Bạn có chắc chắn đã nhận hàng?",
      icon: "warning",
      buttons: ["Cancel", "OK"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate(id);
      }
    });
  };

  return (
    <div className="mt-4 rounded-sm border bg-white py-6 px-4">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center">
          <h3>{seller.nameShop || seller.name || sellerId}</h3>
          <Link href={`/shop/${sellerId}`}>
            <Button
              startIcon={AiOutlineShop}
              classNameStarIcon="mr-1"
              className="ml-2 rounded-sm border px-4 py-1 text-[13px] capitalize transition-all hover:opacity-80"
              text="Xem shop"
            />
          </Link>
        </div>
        <div>
          <h4 className="uppercase text-primary">{status.name}</h4>
        </div>
      </div>
      <div className="pt-4">
        {orderDetails.map((item) => (
          <ProductOrderCard key={item.id} {...item} />
        ))}
      </div>
      <div className="flex items-center justify-end">
        <div className="flex items-center">
          <AiOutlineFileProtect className="text-[20px] text-primary" />
          <span className="ml-1 text-[17px]">
            Tổng số tiền:
            <span className="ml-1 text-[20px] text-primary">
              {formatPrices(total)}
            </span>
          </span>
        </div>
      </div>
      {status.id === 2 && (
        <div className="mt-4 flex items-center justify-end">
          <Button
            text="Đã nhận hàng"
            onClick={handleDelivered}
            className="flex items-center justify-center rounded-sm bg-primary  px-6 py-2 text-[15px] capitalize text-white hover:opacity-80"
          />
          {orderReports !== null ? (
            <Button
              onClick={handleOpenReport}
              text="Xem yêu cầu của bạn"
              className="ml-2 flex items-center justify-center rounded-sm border  px-6 py-2 text-[15px] capitalize  hover:opacity-80"
            />
          ) : (
            <Button
              onClick={handleOpen}
              text="Yêu cầu trả hàng"
              className="ml-2 flex items-center justify-center rounded-sm border  px-6 py-2 text-[15px] capitalize  hover:opacity-80"
            />
          )}
        </div>
      )}
      {status.id === 3 && (
        <div className="mt-4 flex items-center justify-end">
          <Button
            text="Đánh giá"
            onClick={handleOpenComment}
            className="flex items-center justify-center rounded-sm bg-primary  px-6 py-2 text-[15px] capitalize text-white hover:opacity-80"
          />
        </div>
      )}
    </div>
  );
};

export default OrderCard;
