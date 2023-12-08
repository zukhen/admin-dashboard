interface OrderModel {
  _id: string;
  order_userId: string;
  order_checkout: number;
  order_shipping: {
    _id: string;
    street: string;
    city: string;
    state: string;
    country: string;
    latitude: string;
    longitude: string;
    user_id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  order_payment: string;
  order_products: {
    shopId: string;
    shop_discounts: any[];
    priceRow: number;
    priceApplyDiscount: number;
    item_products: {
      product_name: string;
      image: string;
      price: number;
      quantity: number;
      productId: string;
    }[];
  }[];
  order_trackingNumber: string;
  order_status: boolean;
  isBasket: boolean;
  createdOn: string;
  modifiedOn: string;
  __v: number;
  order_reason: string;
  id: number;
  name: string[];
  createdAt: string;
  address: string;
}

