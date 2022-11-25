import React,{useMemo} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CartDetail } from "../../models/cart.model";
import { formatPrices } from "../../utils";

const CheckoutCard:React.FC<CartDetail> = ({cartId,id,qty,sku,skuId}) => {
  const currentPrice = useMemo(() => {
    return sku.price * (100 - sku.discount)/100
  },[skuId])
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex w-[45%] items-center">
        <LazyLoadImage
          src={sku.image || "https://source.unsplash.com/random"}
          className="aspect-[1/1] w-[40px] rounded-sm"
        />
        <h3 className="w-[60%] px-2 text-[16px] line-clamp-1">
          {sku.product.name}
        </h3>
        <span className="text-[16px[ text-[#666]">Loại: {sku.skuValues.map(item => <span className="ml-2 first:ml-0">{`${item.variant.name} ${item.variantOption.name}`}</span>)}</span>
      </div>
      <div className="grid w-[50%] grid-cols-3 gap-4">
        <p>{formatPrices(currentPrice)}</p>
        <p>{qty}</p>
        <p>{formatPrices(currentPrice*qty)}</p>
      </div>
    </div>
  );
};

export default CheckoutCard;
