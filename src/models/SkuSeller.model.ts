export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  categoryId: number;
  sellerId: string;
  createdAt: Date;
  image: string;
}

export interface Variant {
  id: number;
  name: string;
  productId: number;
}

export interface VariantOption {
  id: number;
  name: string;
  variantId: number;
  productId: number;
}

export interface SkuValue {
  id: number;
  productId: number;
  variantId: number;
  variantOptionId: number;
  skuId: number;
  variant: Variant;
  variantOption: VariantOption;
}

export interface Sku {
  id: number;
  price: number;
  qty: number;
  discount: number;
  image: string;
  productId: number;
  product: Product;
  skuValues: SkuValue[];
}
