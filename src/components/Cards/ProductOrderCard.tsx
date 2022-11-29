import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { OrderDetail } from "../../models/order.model";
import { formatPrices } from "../../utils";


const ProductOrderCard: FC<OrderDetail> = ({ discount, id, orderId, price, qty, sku, skuId }) => {
  return (
    <div className="mt-2 flex items-center justify-between border-b pb-2 last:border-none">
      <div className="flex w-[80%]">
        <LazyLoadImage
          className="aspect-[1/1] w-[80px] rounded-sm border"
          src={sku.image || "https://source.unsplash.com/random"}
        />
        <div className="ml-2 px-2">
          <h3 className="text-[16px] line-clamp-2">
            {sku.product.name}
          </h3>
          <p className="mt-1 text-[#666]">Phân loại hàng: {sku.skuValues.map(item => <span key={item.id} className="ml-2 first:ml-0">{item.variant.name} {item.variantOption.name}</span>)}</p>
          <p className="mt-1">x1</p>
        </div>
      </div>
      <div className="flex-1 text-right text-primary">
        {formatPrices((sku.price * (100 - sku.discount) / 100) * qty)}
      </div>
    </div>
  );
};

export default ProductOrderCard;
