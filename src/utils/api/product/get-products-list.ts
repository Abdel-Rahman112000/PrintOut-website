import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import axios from "axios";
import { Product } from "@/types/common/Product";

interface Root {
  status: boolean;
  message: string;
  data: Product[];
}

export const getProductsList = async (headers: AuthHeaders) => {
  return (
    await axios.get<Root>(api`client/products`, {
      headers,
    })
  ).data.data;
};
