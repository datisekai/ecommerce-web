import React, { FC, useEffect, useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Divider from "../components/Divider";
import FilterStarItem from "../components/Filters/FilterStarItem";
import MainLayout from "../components/Layouts/MainLayout";
import WidthLayout from "../components/Layouts/WidthLayout";
import OptionVariant from "../components/OptionVariant";
import { formatPrices } from "../utils";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Button from "../components/Button";
import { BsCartPlus } from "react-icons/bs";
import ShopCard from "../components/Cards/ShopCard";
import ReviewCard from "../components/Cards/ReviewCard";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import ProductApi from "../services/product";
import {
  Comment,
  ProductDetail,
  Sku,
  Variant,
  VariantOption,
} from "../models/product.model";
import { SkuValue } from "@prisma/client";
import Meta from "../components/Meta";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import Router, { useRouter } from "next/router";
import CartApi, { DataAddCart } from "../services/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AuthLayout from "../components/Layouts/AuthLayout";
import toast from "react-hot-toast";
import { Cart, CartDetail } from "../models/cart.model";
import { addCartDetail, setCarts, setCheckout } from "../redux/slices/cart";

type DetailSkuProps = {
  product: ProductDetail;
  slug: string;
};

const DetailSku: FC<DetailSkuProps> = ({
  product,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const images = useMemo(() => {
    return {
      main: product.image,
      children: product.skus?.map((item: Sku) => item.image).slice(0, 5),
    };
  }, [product]);

  const { user } = useAppSelector((state) => state.user);
  const { carts } = useAppSelector((state) => state.cart);

  const [options, setOptions] = useState<VariantOption[]>([]);
  const [currentSku, setCurrentSku] = useState<Sku>();
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const queryClient = useQueryClient();

  const price = useMemo(() => {
    return {
      old: currentSku?.price || 0,
      current:
        ((100 - (currentSku?.discount || 0)) / 100) * (currentSku?.price || 0),
    };
  }, [currentSku]);

  const handleIncrease = () => {
    if (quantity < currentSku.qty) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    setQuantity(1);
  }, [currentSku]);

  useEffect(() => {
    const variantOptions = product.skuValues.filter(
      (item: SkuValue) => item.skuId === product.skus[0]?.id
    );
    const newOptions: VariantOption[] = [];
    variantOptions.forEach((item: SkuValue) => {
      const option: any = product.variantOptions.find(
        (element: VariantOption) => element.id === item.variantOptionId
      );
      newOptions.push(option);
    });

    setCurrentSku(product.skus[0]);
    setOptions(newOptions);
  }, [product]);

  useEffect(() => {
    if (options.length > 0 && options.length === product.variants.length) {
      let skuId: number;
      const groupBySkuId = product.skuValues.reduce((group, product) => {
        const { skuId } = product;
        group[skuId] = group[skuId] ?? [];
        group[skuId].push(product);
        return group;
      }, {});

      for (const key in groupBySkuId) {
        const newOptions = options
          .map((item: VariantOption) => ({
            id: item.id,
            variantId: item.variantId,
          }))
          .sort((a, b) => a.id - b.id);
        const newSkuValue = groupBySkuId[key]
          .map((item: SkuValue) => ({
            id: item.variantOptionId,
            variantId: item.variantId,
          }))
          .sort((a, b) => a.id - b.id);
        if (JSON.stringify(newOptions) === JSON.stringify(newSkuValue)) {
          skuId = +key;
        }
      }

      if (skuId) {
        const sku = product.skus.find((item: Sku) => item.id === skuId);
        if (sku) {
          setCurrentSku(sku);
        }
      }
    }
  }, [options]);

  const handleChecked = (data: VariantOption) => {
    const isExist = options.some((item: VariantOption) => item.id === data.id);
    if (isExist) {
      setOptions(options.filter((item: VariantOption) => item.id !== data.id));
    } else {
      const isExistVariant = options.some(
        (item: VariantOption) => item.variantId === data.variantId
      );
      if (isExistVariant) {
        setOptions(
          options.map((item: VariantOption) => {
            if (item.variantId === data.variantId) {
              return { ...data };
            }
            return item;
          })
        );
      } else {
        setOptions([...options, data]);
      }
    }
  };

  const dispatch = useAppDispatch();

  const { mutate: addToCart } = useMutation(CartApi.addToCart, {
    onSuccess: (data) => {
      dispatch(addCartDetail(data));

      toast.success("Đã thêm vào giỏ hàng");
    },
    onError: (error) => {
      toast.error("Vui lòng thử lại");
    },
  });

  const { mutate: buyNow } = useMutation(CartApi.addToCart, {
    onSuccess: (data) => {
      dispatch(addCartDetail(data));
      dispatch(setCheckout([data]))

    },
    onError: (error) => {
      toast.error("Vui lòng thử lại");
    },
  });

  const handleAddToCart = async () => {

    if (user) {
      const data: DataAddCart = {
        qty: quantity,
        sellerId: product.sellerId,
        skuId: currentSku.id,
      };
      addToCart(data);
    } else {
      router.push(`/login?redirect=${product.slug}`)
    }
  };

  const handleBuyNow = async () => {
    if (user) {
      const data: DataAddCart = {
        qty: quantity,
        sellerId: product.sellerId,
        skuId: currentSku.id,
      };
      buyNow(data)
      router.push('/cart')
    } else {
      router.push(`/login?redirect=${product.slug}`)
    }
  }

  return (
    <>
      <Meta
        image={product.image}
        title={product.name}
        description={product.description}
      />
      <AuthLayout>
        <MainLayout>
          <WidthLayout>
            <div className="mx-auto max-w-[calc(100%-16px)] py-6">
              <div className="flex flex-col rounded-sm bg-white p-6 shadow-sm lg:flex-row">
                <div className="w-full lg:w-[40%]">
                  <LazyLoadImage
                    src={images.main}
                    alt=""
                    className="aspect-[1/1] w-full rounded-sm"
                  />
                  <div className="mt-1 grid grid-cols-5 gap-1">
                    {images.children?.map((item: string, index: number) => (
                      <LazyLoadImage
                        key={index}
                        src={item}
                        alt={item}
                        className="aspect-[1/1] w-full rounded-sm"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6 w-full pl-0 lg:mt-0 lg:w-[60%] lg:pl-6">
                  <h1 className="text-[17px] lg:text-[19px]">{product.name}</h1>
                  <div className="mt-2 flex items-center">
                    <FilterStarItem
                      color="text-primary"
                      star={product.currentStar || 0}
                      isStar={true}
                      isText={false}
                    />
                    <Divider width="2px" height="20px" mx="16px" my="0px" />
                    <div className="flex items-center">
                      <span className="mr-2 text-[18px] underline">
                        {product?.comments?.length || 0}
                      </span>
                      <span className="text-[16px] capitalize text-[#666]">
                        Đánh giá
                      </span>
                    </div>
                    <Divider width="2px" height="20px" mx="16px" my="0px" />
                    <div className="flex items-center">
                      <span className="mr-2 text-[18px] ">
                        {product.qtySold}
                      </span>
                      <span className="text-[16px] capitalize text-[#666]">
                        Đã bán
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 rounded-sm bg-bgPrimary p-4">
                    <div className="flex items-center">
                      <span className="text-[17px] text-[#666] line-through lg:text-[17px]">
                        {formatPrices(price.old)}
                      </span>
                      <span className="ml-4 text-[25px] text-primary lg:text-[30px]">
                        {formatPrices(price.current)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <span className="w-[20%] text-[17px] capitalize text-[#666]">
                      Mã giảm giá của shop
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="cursor-pointer rounded-sm bg-red-200 p-1">
                        <span className="text-[17px] text-primary">
                          11% Giảm
                        </span>
                      </div>
                    </div>
                  </div>

                  {product?.variants?.map((item: Variant, index: number) => {
                    return (
                      <div
                        className="mt-6 flex items-center"
                        key={`variant-${item.id}`}
                      >
                        <span className="w-[20%] text-[17px] capitalize text-[#666]">
                          {item.name}
                        </span>
                        <div className="grid flex-1 grid-cols-3 gap-2 lg:grid-cols-5">
                          {item?.variantOptions?.map(
                            (element: VariantOption, index: number) => {
                              return (
                                <OptionVariant
                                  onClick={() => handleChecked(element)}
                                  key={`variantOption-${element.id}`}
                                  checked={options.some(
                                    (variant: VariantOption) =>
                                      variant.id === element.id
                                  )}
                                  text={element.name}
                                />
                              );
                            }
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div className="mt-6 flex items-center">
                    <span className="w-[20%] text-[17px] capitalize text-[#666]">
                      Số lượng
                    </span>
                    <div className="flex flex-1 items-center">
                      <div className="flex items-center rounded-sm border">
                        <AiOutlineMinus
                          onClick={handleDecrease}
                          className="mx-2 my-2 cursor-pointer"
                        />
                        <input
                          type="text"
                          className="h-full w-[50px] select-none text-center text-[17px] outline-none"
                          value={quantity}
                          readOnly
                        />
                        <AiOutlinePlus
                          onClick={handleIncrease}
                          className="mx-2 my-2 cursor-pointer "
                        />
                      </div>
                      <span className="ml-4 text-[15px] text-[#666]">
                        {currentSku?.qty} sản phẩm có sẵn
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <Button
                      onClick={handleAddToCart}
                      text="Thêm vào giỏ hàng"
                      startIcon={BsCartPlus}
                      classNameStarIcon="text-[20px] mr-2"
                      className="rounded-sm border border-primary bg-[rgba(255,197,178,.181)] px-6 py-3 text-[17px] capitalize text-primary shadow-sm transition-all hover:opacity-90"
                    />
                    <Button
                      onClick={handleBuyNow}
                      text="Mua ngay"
                      className="ml-2 rounded-sm border border-primary bg-primary px-6 py-3 text-[17px] capitalize text-white shadow-sm transition-all hover:opacity-90"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <ShopCard {...product.seller} />
              </div>
              <div className="mt-4 rounded-sm bg-white p-4">
                <h3 className="text-[17px] uppercase">Mô tả sản phẩm</h3>
                <p className="mt-4 text-justify" style={{ lineHeight: 1.5 }}>
                  {product.description}
                </p>
              </div>
              <div className="mt-4 rounded-sm bg-white p-4">
                <h3 className="text-[17px] uppercase">Đánh giá sản phẩm</h3>
                <div className="mt-4 flex items-center rounded-sm bg-orange-100 p-6">
                  <div>
                    <span className="text-[30px] text-primary">
                      {product.currentStar || 1}
                    </span>
                    <span className="pl-1 text-[20px] text-primary">/5</span>
                    <FilterStarItem
                      star={4.4}
                      isText={false}
                      color="text-primary"
                    />
                  </div>
                  <div className="grid flex-1 grid-cols-3 gap-2  pl-6 lg:grid-cols-5">
                    {[
                      "Tất cả",
                      "5 Sao ",
                      "4 Sao ",
                      "3 Sao ",
                      "2 Sao ",
                      "1 Sao ",
                      "Có hình ảnh",
                    ].map((item: string) => (
                      <button
                        key={item}
                        className="border bg-white px-4 py-2 capitalize shadow-sm"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  {product.comments.map((item: Comment) => (
                    <ReviewCard {...item} key={item.id} />
                  ))}
                </div>
              </div>
            </div>
          </WidthLayout>
        </MainLayout>
      </AuthLayout>
    </>
  );
};

export default DetailSku;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const data = await Promise.all([ProductApi.detail(slug)]);
  return {
    props: {
      product: data[0],
      slug,
    },
  };
};
