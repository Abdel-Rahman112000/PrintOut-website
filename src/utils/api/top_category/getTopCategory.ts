import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import axios from "axios";
import { ProductsSearchParamsType } from "@/app/(main-layout)/products/context";
import { Category } from "@/types/common/Category";

export const getTopCategories = async (
  headers: AuthHeaders,
  params?: ProductsSearchParamsType
) => {
  return (
    await axios.get<{ data: Category[] }>(api`client/featured-categories`, {
      headers,
      params,
    })
  ).data.data;
};
