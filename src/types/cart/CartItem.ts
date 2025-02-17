import { Media } from "../common/Media";
import { User } from "../common/User";

export type CartItem = {
  id: number;
  client_id: number;
  status: number;
  type_id: number;
  total_price: string;
  note: string;
  created_at: string;
  updated_at: string;
  product_name: string;
  product_id: number;
  pictures: Media[];
  cart_detail: any;
  client: User;
  media: Media[];
};
