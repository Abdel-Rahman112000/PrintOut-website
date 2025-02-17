import { Media } from "../Media";
import { Product } from "../Product";

export interface Types {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  created_at: string;
  updated_at: string;
  pictures?: any[];
  name: string;
  products?: Product[];
  media?: Media[];
}
