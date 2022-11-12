export interface ProductModel {
  id: number;
  slug: string;
  name: string;
  description: string;
  categoryId: number;
  sellerId: string;
  createdAt: Date;
  image: string;
  minPrice: number;
  maxPrice: number;
  qtySold: number;
}

export interface CommentImage {
  id:number,
  image:string,
  commentId:number
}

export interface Comment {
  id: number;
  content: string;
  pointStar: number;
  userId: string;
  productId: number;
  user: User2;
  createdAt:string
  commentImages:CommentImage[]
}

export interface Products {
  products: ProductModel[];
  totalPage: number;
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  nameShop?: any;
  date?: any;
  image: string;
  createdAt:string
  qty:number
}

export interface VariantOption {
  id: number;
  name: string;
  variantId: number;
  productId: number;
}

export interface Variant {
  id: number;
  name: string;
  productId: number;
  variantOptions: VariantOption[];
}

export interface Sku {
  id: number;
  price: number;
  qty: number;
  discount: number;
  image: string;
  productId: number;
}

export interface SkuValue {
  id: number;
  productId: number;
  variantId: number;
  variantOptionId: number;
  skuId: number;
}

export interface User2 {
  phone: string;
  id: string;
  image: string;
  email: string;
  name: string;
}


export interface ProductDetail {
  id: number;
  slug: string;
  name: string;
  description: string;
  categoryId: number;
  sellerId: string;
  createdAt: Date;
  image: string;
  seller: Seller;
  variants: Variant[];
  skus: Sku[];
  variantOptions: VariantOption[];
  qtySold: number;
  skuValues: SkuValue[];
  currentStar:number
  comments:Comment[]
}
