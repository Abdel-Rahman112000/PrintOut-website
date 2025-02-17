import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import axios from "axios";
import { Product } from "@/types/common/Product";

interface Root {
  status: boolean;
  message: string;
  data: Product;
}

export const getProduct = async (
  headers: AuthHeaders,
  productId: number | string
) => {
  return (
    await axios.get<Root>(api`client/product/${productId}`, {
      headers,
    })
  ).data;
};
