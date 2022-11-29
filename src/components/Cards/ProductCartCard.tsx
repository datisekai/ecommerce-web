import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import swal from "sweetalert";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { CartDetail } from "../../models/cart.model";
import {
  deleteCartDetail, updateCartDetail, updateCheckoutQuantity
} from "../../redux/slices/cart";
import CartApi from "../../services/cart";
import { formatPrices } from "../../utils";

interface ProductCartCardProps extends CartDetail {
  sellerId: string;
  onChangeSku: (sku: CartDetail) => void;
  skuCheckout: CartDetail[]
}

const ProductCartCard: React.FC<ProductCartCardProps> = ({
  cartId,
  id,
  qty,
  sku,
  skuId,
  sellerId,
  skuCheckout,
  onChangeSku,
}) => {
  const [quantity, setQuantity] = useState(qty);

  const dispatch = useAppDispatch();

  const { mutate: updateCart, isLoading } = useMutation(CartApi.updateToCart, {
    onSuccess: (data: CartDetail) => {
      dispatch(updateCartDetail(data));
      dispatch(updateCheckoutQuantity({
        id: data.id,
        qty: data.qty
      }))
    },
    onError: (error) => {
      toast.error("Vui lòng thử lại");
    },
  });

  const { mutate: deleteCart } = useMutation(CartApi.deleteToCart, {
    onSuccess: (data) => {
      dispatch(deleteCartDetail(data));
      toast.success("Xóa thành công");
    },
    onError: (error) => {
      toast.error("Vui lòng thử lại");
    },
  });

  useEffect(() => {
    if (quantity > sku.qty) {
      toast.error("Số lượng không đủ");
      setQuantity(sku.qty);
    } else if (quantity !== sku.qty) {
      updateCart({ cartDetailId: id, qty: quantity });
    }
  }, [quantity]);

  const handleIncrease = () => {
    if (quantity < sku.qty) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Số lượng không đủ");
    }
  };

  const handleDelete = () => {
    swal({
      title: "Bạn có chắc chắn muốn xóa?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCart({ cartDetailId: id, sellerId: sellerId });
      }
    });
  };


  return (
    <div className="flex items-center border-b py-5 px-10 last:border-none ">
      <div className="flex flex-1 items-center pr-4">
        <input
          type="checkbox"
          checked={skuCheckout.some(item => item.skuId === skuId)}
          onChange={() => onChangeSku({ cartId, id, qty, sku, skuId })}
          name=""
          id=""
          className="h-4 w-4"
        />
        <div className="ml-5 flex w-[80%] items-center ">
          <LazyLoadImage
            src={sku.image || "https://source.unsplash.com/random"}
            className="aspect-[1/1] w-[80px] rounded-sm"
          />
          <h3 className=" px-4 text-[16px] line-clamp-2">{sku.product.name}</h3>
        </div>
        <span className="text-[16px] text-[#666] ">
          Phân loại hàng: {sku.skuValues.map(item => <span key={item.id} className="ml-2 first:ml-0">{item.variant.name} {item.variantOption.name}</span>)}
        </span>
      </div>
      <div className="flex flex-1 items-center justify-between ">
        <h5 className="text-[16px] text-[#666]">
          {formatPrices((sku.price * (100 - sku.discount)) / 100)}
        </h5>
        <div className="ml-4 flex items-center rounded-sm border">
          <AiOutlineMinus
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            className="my-2 mx-2 cursor-pointer"
          />
          <input
            type="text"
            onChange={(e: any) => setQuantity(+e.target.value)}
            className="h-full w-[50px] text-center text-[17px] outline-none"
            value={quantity}
          />
          <AiOutlinePlus
            onClick={handleIncrease}
            className="my-2 mx-2 cursor-pointer "
          />
        </div>
        <h5 className="ml-4 text-[16px]  text-primary">
          {formatPrices(((sku.price * (100 - sku.discount)) / 100) * quantity)}
        </h5>
        <h5
          onClick={handleDelete}
          className="ml-4 text-[16px] text-[#666] transition-all hover:cursor-pointer hover:text-primary"
        >
          Xóa
        </h5>
      </div>
    </div>
  );
};

export default ProductCartCard;
