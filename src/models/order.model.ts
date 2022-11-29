export interface OrderCart {
  createdAt: string;
  description: string;
  id: number;
  isPay: boolean;
  sellerId: string;
  status: number;
  updatedAt: string;
  userId: string;
}

export interface OrderDetail {
  discount: number;
  id: number;
  orderId: number;
  price: number;
  qty: number;
  skuId: number;
}

export interface OrderReponse {
  order: OrderCart;
  orderDetail: OrderDetail[];
}

export interface Status {
  id: number;
  name: string;
}

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

export interface OrderDetail {
  id: number;
  orderId: number;
  skuId: number;
  price: number;
  discount: number;
  qty: number;
  sku: Sku;
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  nameShop?: any;
  date?: any;
  image: string;
  createdAt: Date;
}

export interface Order {
  id: number;
  userId: string;
  total: number;
  sellerId: string;
  statusId: number;
  isPay: boolean;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  status: Status;
  orderDetails: OrderDetail[];
  seller: Seller;
}
