export type PriceHistoryItem = {
    price: number;
};

export type User = {
    email: string;
};

export type Product = {
    _id?: string;
    url: string;
    currency?: string;
    image: string;
    title: string;
    currentPrice: string;
    originalPrice: string;
    priceHistory: PriceHistoryItem[] | [];
    highestPrice: string;
    lowestPrice: string;
    averagePrice: string;
    discountRate: string;
    description: string;
    category: string;
    reviewsCount: number;
    stars: number;
    isOutOfStock: Boolean;
    users?: User[];
};

export type NotificationType =
    | "WELCOME"
    | "CHANGE_OF_STOCK"
    | "LOWEST_PRICE"
    | "THRESHOLD_MET";

export type EmailContent = {
    subject: string;
    body: string;
};

export type EmailProductInfo = {
    title: string;
    url: string;
};
