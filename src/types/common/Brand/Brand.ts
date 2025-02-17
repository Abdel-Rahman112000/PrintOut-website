import { Media } from "../Media";

export type Brand = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  media: Media[];
};
