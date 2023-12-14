interface ProductAttribute {
    brand: string;
    size: string;
    ingredients: string;
    allergens: string;
    nutritionalValue: string;
    availability: string;
    images: string[];
    available_time_starts: string;
    available_time_ends: string;
  }
  
  interface ProductInfo {
    _id: string;
    product_name: string;
    image: string;
    product_thumb: string;
    categoryId: string;
    product_description: string;
    product_price: number;
    product_quality: number;
    product_type: string;
    product_shop: string;
    product_attributes: ProductAttribute;
    product_ratingsAverage: number;
    product_variations: any[];
    createdAt: string;
    updatedAt: string;
    product_distance: string;
    product_slug: string;
    __v: number;
    product_rating: string;
  }
  
  interface TopOrderItem {
    _id: string;
    totalQuantity: number;
    productInfo: ProductInfo;
  }