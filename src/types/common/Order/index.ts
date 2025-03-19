import { DeliveryMan } from "@/types/delivery/DeliveryMan";
import { Media } from "../Media";
import { Product, ProductType } from "../Product";
import { User } from "../User";

export interface Order {
  id: number;
  type_id: number;
  client_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  address: string;
  method: string;
  latitude: string;
  longitude: string;
  delivery_within: number;
  delivery_type: string;
  note: any;
  total_price: string;
  file: any;
  last_status: any;
  pictures?: Media[];
  order_status?: Status[];
  order_details?: OrderDetail[];
  orders?: SubOrderType[];
  payment: number;
  product_name: string;
  product?: Product;
  status_show?: {
    name: string;
    key: string;
    by: string;

    badge_color: string;
  };
  client?: User;
  media: Media[];
  // main_order: MainOrderType;
  status_vendor?: number; //-1 pending 1 accepted 2 done
  vendor_id: number;
  vendor?: User;
  delivery_id: string;
  delivery?: DeliveryMan;
  order_arrive_at: string;
}

export type SubOrderType = {
  type_id: number;
  id: number;
  client_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  address: string;
  method: string;
  latitude: string;
  longitude: string;
  delivery_type: string;
  note: string;
  total_price: string;
  file: null;
  last_status: string;
  delivery_id: null;
  by: string;
  color: string;
  scaling: string;
  payment: number;
  product_name: string;
  product_id: number;
  global_id: number;
  main_order_id: string;
  media: Media[];
  type?: ProductType;
  order_arrive_at: string;
};

export interface Status {
  id: number;
  client_id: number;
  order_id: number;
  status: string;
  action: number;
  created_at: string;
  updated_at?: string;
}

export interface OrderDetail {
  //order?.order_details?.product_name
  id: number;
  product_id: number;
  order_id: number;
  qty: number;
  price: string;
  file?: string;
  bleed?: number;
  color?: string;
  scalling?: string;
  paper_type?: string;
  customizations?: Customization[];
  created_at: string;
  updated_at: string;
  product_name: string;
  height: number;
  width: number;
  product?: Product;
  order?: Order;
}

export interface Customization {
  id: number;
  name: string;
  type: string;
  price: number;
}
