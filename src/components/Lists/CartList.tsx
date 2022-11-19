import React, { useCallback } from "react";
import { Cart, CartDetail } from "../../models/cart.model";
import ProductCartCard from "../Cards/ProductCartCard";

interface CartProps extends Cart {
  onChange: (currentCart: Cart) => void;
  onChangeSku: (sku: CartDetail) => void;
  skuCheckout:CartDetail[]
}

const CartList: React.FC<CartProps> = ({
  cartDetails,
  id,
  sellerId,
  userId,
  seller,
  onChange,
  onChangeSku,
  skuCheckout
}) => {
  return (
    <div className="mt-3 rounded-sm bg-white pt-3 shadow-sm">
      <div className="flex items-center border-b  px-10   py-5">
        <input
          onChange={() =>
            onChange({ id, cartDetails, seller, sellerId, userId })
          }
          type="checkbox"
          checked={skuCheckout.some(item => item.cartId === id)}
          id="all"
          className="h-4 w-4"
        />
        <label htmlFor="all" className="pl-5 text-[16px]">
          {seller?.nameShop || seller?.name || seller?.phone || seller?.email}
        </label>
      </div>
      <div>
        {cartDetails?.map((item: CartDetail) => (
          <ProductCartCard
          skuCheckout={skuCheckout}
            onChangeSku={onChangeSku}
            sellerId={sellerId}
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};
export default CartList;
