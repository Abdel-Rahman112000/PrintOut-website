"use client";

import { api } from "@/constants/api";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { Brand } from "@/types/common/Brand/Brand";
import { Category, Types } from "@/types/common/Category";
import { Product } from "@/types/common/Product";
import { getBrandsData } from "@/utils/api/brands/get-brands";
import {
  getCategories,
  TypeCategories,
} from "@/utils/api/category/get-categories";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  brands: undefined,
  filter: undefined,
  searchParams: {},
  loadingProducts: false,
  handleChangeSearchParams: (_params: ProductsSearchParamsType) => {},
  setLimit: () => {},
  limit: 15,
});

export const ProductsContextProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const [limit, setLimit] = useState(9);

  const { children } = props;
  const [searchParams, setSearchParams] = useState<ProductsSearchParamsType>(
    {}
  );
  // brands
  const { data: brands } = useQuery({
    queryKey: [`brands-data`],
    queryFn: async () => {
      const headers = await getClientAuthHeaders();
      const response = await getBrandsData(headers);
      return response;
    },
  });
  // categories
  const { data: filter } = useQuery({
    queryKey: [`categories-data`, searchParams],
    queryFn: async () => {
      const headers = await getClientAuthHeaders();
      const response = await getCategories(headers, searchParams);
      return response;
    },
  });

  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: [`products-data`, searchParams],
    queryFn: async () => {
      const response = await axios.get<ProductsResponseType>(
        api`client/products`,
        {
          params: {
            ...searchParams,
            limit: limit,
          },
        }
      );

      return response.data.data;
    },
  });

  // TODO::declare and define helper methods
  function handleChangeSearchParams(_params: ProductsSearchParamsType) {
    setSearchParams(_params);
  }

  // ** return component ui
  return (
    <ProductsContext.Provider
      value={{
        products,
        brands,
        filter,
        searchParams,
        loadingProducts,
        handleChangeSearchParams,
        setLimit,
        limit,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

type ProductsResponseType = {
  status: boolean;
  message: string;
  data: Product[];
};
export type ProductsSearchParamsType = {
  category_id?: string;
  brand_id?: string;
  type_id?: string;
  search?: string;
  feature?: string;
  limit?: number;
};
type PropsType = { children: ReactNode; products: Product[] };
type ProductsContextType = {
  products: Product[] | undefined;
  searchParams: ProductsSearchParamsType;
  brands: Brand[] | undefined;
  loadingProducts: boolean;
  filter: TypeCategories | undefined;
  handleChangeSearchParams(_params: ProductsSearchParamsType): void;
  setLimit: Dispatch<SetStateAction<number>>;
  limit: number;
};
