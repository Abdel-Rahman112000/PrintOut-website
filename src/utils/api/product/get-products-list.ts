import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import { Product } from "@/types/common/Product";
import axios, { AxiosRequestConfig } from "axios";

interface Root {
  status: boolean;
  message: string;
  data: Product[];
}


export const getProductsList = async (
  headers: AuthHeaders,
  options?: AxiosRequestConfig // use AxiosRequestConfig instead of RequestInit
) => {
  return (
    await axios.get<Root>(api`client/products`, {
      headers,
      ...options,
    })
  ).data.data;
};