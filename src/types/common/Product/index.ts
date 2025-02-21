import { Category } from "../Category";
import { Media } from "../Media";

export enum $ProductType {
  CUSTOM_PRINT = 3,
}

export interface Product {
  id: number;
  type_id: number;
  category_id: number;
  brand_id: any;
  user_type: string;
  created_at: string;
  updated_at: string;
  status: number;
  feature: number;
  description?: string;
  pictures?: any[];
  name: string;
  color?: number;
  scaling?: number;
  size?: number;
  is_favorite: boolean;
  brand?: Brand;
  type?: ProductType;
  category?: Category;
  product_price?: ProductPrice;
  customizations?: Customization[];
  media: Media[];
}

export type Brand = {
  created_at: string;
  id: number;
  media: Media[];
  name: string;
  updated_at: string;
};

export interface ProductPrice {
  id: number;
  price: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  product_price_condition?: ProductPriceCondition[];
}

export interface Customization {
  id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  customizations_type: string;
  name: string;
  choices?: Choice[];
}

export interface Choice {
  id: number;
  name: string;
  type: any;
  price: number;
  customization_id: number;
  created_at: string;
  updated_at: string;
}

export interface ProductPriceCondition {
  id: number;
  price: number;
  condition: string;
  condition_answer: number;
  product_price_id: number;
  created_at: string;
  updated_at: string;
}

export interface ProductType {
  id: number;
  created_at: string;
  updated_at: string;
  pictures?: any[];
  name: string;
  description: string;
  media?: Media[];
}
