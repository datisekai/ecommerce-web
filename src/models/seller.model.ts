export interface Count {
    contacts: number;
    supports: number;
    products: number;
    comments: number;
    voucherUsers: number;
    accounts: number;
    sessions: number;
}

export interface SellerModel {
    id: string;
    image?: any;
    phone: string;
    email?: any;
    createdAt: Date;
    name?: any;
    nameShop?: any;
    _count: Count;
}