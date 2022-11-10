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
import { GetStaticPaths, GetStaticProps } from "next";
import ProductApi from "../services/product";
import {
  ProductDetail,
  Sku,
  Variant,
  VariantOption,
} from "../models/product.model";
import { SkuValue } from "@prisma/client";

type DetailSkuProps = {
  product: ProductDetail;
  slug: string;
};

const DetailSku: FC<DetailSkuProps> = ({ product, slug }) => {
  const images = useMemo(() => {
    return {
      main: product.image,
      children: product.skus?.map((item: Sku) => item.image).slice(0, 5),
    };
  }, [product]);

  const [options, setOptions] = useState<VariantOption[]>([]);
  const [currentSku, setCurrentSku] = useState<Sku>();

  const price = useMemo(() => {
    return {
      old: currentSku?.price || 0,
      current:
        ((100 - (currentSku?.discount || 0)) / 100) * (currentSku?.price || 0),
    };
  }, [currentSku]);

  const checkItemSameArray = (items: number[]) => {
    if (items.length === 0) {
      return false;
    }
    if (items.length === 1) {
      return true;
    } else {
      return items[0] === items[1];
    }
  };

  useEffect(() => {
    const variantOptions = product.skuValues.filter(
      (item: SkuValue) => item.skuId === product.skus[0]?.id
    );
    let newOptions: VariantOption[] = [];
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

      for (let key in groupBySkuId) {
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

      // console.log("Groupby", groupBySkuId);
      // options.forEach((item: VariantOption) => {
      //   const skuValueCurrent = product.skuValues.filter(
      //     (element: SkuValue) =>
      //       element.variantId === item.variantId &&
      //       element.variantOptionId === item.id
      //   );

      //   console.log("SkuValueCurrent", skuValueCurrent);
      //   if (skuValueCurrent.length === 1) {
      //     skuId.push(skuValueCurrent[0].skuId);
      //   } else {
      //     if (skuId.length > 1) {
      //       const sameSku = skuValueCurrent.find(
      //         (element: SkuValue) => element.skuId === skuId[0]
      //       );
      //       skuId.push(sameSku.id);
      //     }
      //   }
      // });
      console.log("skuId", skuId);
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

  console.log(currentSku);
  console.log(options);

  return (
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
                  star={4.6}
                  isStar={true}
                  isText={false}
                />
                <Divider width="2px" height="20px" mx="16px" my="0px" />
                <div className="flex items-center">
                  <span className="mr-2 text-[18px] underline">115</span>
                  <span className="text-[16px] capitalize text-[#666]">
                    Đánh giá
                  </span>
                </div>
                <Divider width="2px" height="20px" mx="16px" my="0px" />
                <div className="flex items-center">
                  <span className="mr-2 text-[18px] ">{product.qtySold}</span>
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
                    <span className="text-[17px] text-primary">11% Giảm</span>
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
                    <AiOutlineMinus className="mx-2 my-2 cursor-pointer" />
                    <input
                      type="text"
                      className="h-full w-[50px] text-center text-[17px] outline-none"
                      value={1}
                    />
                    <AiOutlinePlus className="mx-2 my-2 cursor-pointer " />
                  </div>
                  <span className="ml-4 text-[15px] text-[#666]">
                    {currentSku?.qty} sản phẩm có sẵn
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <Button
                  text="Thêm vào giỏ hàng"
                  startIcon={BsCartPlus}
                  classNameStarIcon="text-[20px] mr-2"
                  className="rounded-sm border border-primary bg-[rgba(255,197,178,.181)] px-6 py-3 text-[17px] capitalize text-primary shadow-sm transition-all hover:opacity-90"
                />
                <Button
                  text="Mua ngay"
                  className="ml-2 rounded-sm border border-primary bg-primary px-6 py-3 text-[17px] capitalize text-white shadow-sm transition-all hover:opacity-90"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <ShopCard />
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
                <span className="text-[30px] text-primary">4.7</span>
                <span className="pl-1 text-[20px] text-primary">trên 5</span>
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
                ].map((item: any) => (
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
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </div>
          </div>
        </div>
      </WidthLayout>
    </MainLayout>
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
