export interface Sku {
  id: number;
  price: number;
  qty: number;
  discount: number;
  image: string;
  productId: number;
  product: Product;
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

export interface CartDetail {
  id: number;
  skuId: number;
  qty: number;
  cartId: number;
  sku: Sku;
}

export interface Seller {
  id: string;
  name?: any;
  email?: any;
  phone: string;
  nameShop?: any;
  gender?: any;
  createdAt: Date;
  date?: any;
  image?: any;
}

export interface Cart {
  id: number;
  sellerId?: string;
  userId?: string;
  cartDetails: CartDetail[];
  seller?: Seller;
}
