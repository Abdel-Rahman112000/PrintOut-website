import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import axios from "axios";
import { Category, Types } from "@/types/common/Category";
import { ProductsSearchParamsType } from "@/app/(main-layout)/products/context";

export interface TypeCategories {
  status: boolean;
  message: string;
  data: Types[];
  categories: Category[];
}

export const getCategories = async (
  headers: AuthHeaders,
  params?: ProductsSearchParamsType
) => {
  return (
    await axios.get<TypeCategories>(api`client/type-categories`, {
      headers,
      params,
    })
  ).data;
};
