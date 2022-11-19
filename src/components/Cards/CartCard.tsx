import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CartDetail } from "../../models/cart.model";
import { formatPrices } from "../../utils";

const CartCard: React.FC<CartDetail> = ({ cartId, id, qty, sku, skuId }) => {
  return (
    <div className="mt-2 flex items-center justify-between">
      <div className="flex items-center">
        <LazyLoadImage
          className="aspect-[1/1] w-[50px] rounded-sm"
          src={sku.image || "https://source.unsplash.com/random"}
        />
        <h3 className="px-2 text-[15px] line-clamp-1">{sku.product.name}</h3>
      </div>
      <div className="text-[17px] text-primary">
        {formatPrices((sku.price * (100 - sku.discount)) / 100)}
      </div>
    </div>
  );
};

export default CartCard;
