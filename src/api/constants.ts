//all the url config in here
export const BASE_URL_API = "https://delifood.io.vn/api/v1";
// export const BASE_URL_API = "http://localhost:3056/api/v1";
export const x_api_key =
  "a5c8bd1fc3e63b13fd82140eb433e09ef950abd8b11d0529c35e92db93f8c4ead881ccea879d15f92508db3301d97f3dcb5f4629a70fcc825c90283073bfb163";

// product
export const PRODUCT = {
  COUNT: "statistical/product/count",
  QUERY: "statistical/product",
  POST: "product",
  HIDE: "product/draft",
  SHOW: "product/publish",
  DRAFT:"product/drafts/all",
  PUBLISHED:"product/published/all"
};

export const USERS = {
  COUNT: "statistical/user/count",
  QUERY: "statistical/user",
};

export const AUTH = {
  LOGIN_ADMIN: "admin/login",
  LOGIN_SHOP: "auth/login",
  REGISTER: "admin/register",
};

export const SHOPS = {
  ADD: "statistical/shop/create",
  GET_PROFILE: "profile",
};

export const ORDERS = {
  COUNT: "statistical/order/count",
  QUERY: "order/shop",
  COMFIRMED: "order/confirmed",
  SHIPPING: "order/shipping",
  TOP_PRODUCT:"order/top-product",
  TOP_ORDER:"order/top-order"
};

export const CATEGORIES = {
  QUERY: "category",
};

export const DISCOUNT = {
  COUNT: "statistical/discount/count",
  GET_BY_SHOP: "discount",
};

export const ADDRESS={
  ADD:"address"
}