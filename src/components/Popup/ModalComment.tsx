import { useMutation } from "@tanstack/react-query";
import React, { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Order } from "../../models/order.model";
import CommentApi from "../../services/comment";
import { uploadImg } from "../../utils";
import Button from "../Button";
import ProductOrderCard from "../Cards/ProductOrderCard";
import dataStar from "../data/star";

type ModalCommentProps = {
  open: boolean;
  handleHide: () => void;
  order: Order;
};

const ModalComment: FC<ModalCommentProps> = ({ handleHide, open, order }) => {
  const [files, setFiles] = useState<FileList>();
  const [desc, setDesc] = useState("");
  const [star, setStar] = useState({
    value: 0,
    text: "Chưa đánh giá",
  });

  const handleHide2 = useCallback(() => {
    setDesc("");
    setStar({
      value: 0,
      text: "Chưa đánh giá",
    });
    setFiles(undefined);
    handleHide();
  }, []);

  const { mutate, isLoading } = useMutation(CommentApi.addComments, {
    onSuccess(data, variables, context) {
      toast.success("Đánh giá thành công.");
      handleHide();
    },
    onError(error: any, variables, context) {
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  });

  const handleComment = async () => {
    if (!files || !desc || star.value == 0) {
      toast.error("Vui lòng chọn đầy đủ");
      return;
    }

    const images = await Promise.all(
      Array.from(files).map((item) => uploadImg(item))
    );

    const productIds: number[] = [];

    order.orderDetails.forEach((item) => {
      const isExist = productIds.some(
        (element) => element === item.sku.productId
      );
      if (!isExist) {
        productIds.push(item.sku.productId);
      }
    });

    mutate({
      content: desc,
      images,
      pointStar: star.value,
      productIds,
    });
  };

  return (
    <div className={`${open ? "flex" : "hidden"}`}>
      <div
        className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.6)]"
        onClick={() => {
          handleHide2();
        }}
      />
      <div
        className={`animateOpacity fixed top-[50%] left-[50%] z-[200] w-[500px] translate-x-[-50%] translate-y-[-50%] select-none rounded-sm bg-white px-6 py-4 shadow-md transition-all ${
          !open && "hidden"
        }`}
      >
        <h2 className="text-[17px]">Đánh giá sản phẩm</h2>
        <div className="mt-2 max-h-[200px] overflow-y-scroll">
          {order?.orderDetails.map((item) => (
            <ProductOrderCard key={item.id} {...item} />
          ))}
        </div>

        <div className="mt-4 flex items-center">
          <div className="flex items-center">
            {dataStar.map((item) =>
              item.value <= star.value ? (
                <AiFillStar
                  key={item.value}
                  onClick={() => setStar(item)}
                  className={`text-[20px] text-yellow-500 transition-all hover:cursor-pointer`}
                />
              ) : (
                <AiOutlineStar
                  key={item.value}
                  onClick={() => setStar(item)}
                  className={`text-[20px] text-yellow-500 transition-all hover:cursor-pointer`}
                />
              )
            )}
          </div>
          <span className="ml-2 text-yellow-500">{star.text}</span>
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="text-[16px]">
            Mô tả
          </label>
          <textarea
            className="mt-1 block w-full rounded-sm border px-4 py-2 outline-none"
            placeholder="Vui lòng nhập đánh giá của bạn về sản phẩm"
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
        <div className="mt-6 flex items-center justify-end">
          <Button
            text="Đóng"
            onClick={handleHide2}
            className=" flex w-[150px] items-center justify-center rounded-sm bg-[#999] px-4 py-2 text-white"
          />
          <Button
            onClick={handleComment}
            disabled={isLoading}
            text="Đánh giá"
            className="ml-1 flex w-[150px] items-center justify-center rounded-sm bg-primary px-4 py-2 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalComment;
