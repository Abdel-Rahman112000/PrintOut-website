import axios from "axios";
import { api } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import { getServerAuthHeaders } from "@/libs/auth/getServerAuthHeaders";
import { Media } from "@/types/common/Media";
import { Product } from "@/types/common/Product";
import { Category } from "@/types/common/Category";

const fetchData = async () => {
  const headers = await getServerAuthHeaders();
  const response = await axios.get<HomeReqResponseType>(api`client/home`, {
    headers,
  });

  return response.data;
};

export default function useHomeData() {
  return useQuery({
    queryKey: [`home-page-data`],
    queryFn: fetchData,
  });
}

type HomeReqResponseType = {
  covers: CoverType[];
  types: PrintType[];
  brands: CoverType[];
  productsRegularGiveaway: Product[];
  categoriesRegularGiveaway: Category[];
};

export type CoverType = {
  created_at: string;
  id: number;
  media: Media[];
  name: string;
  updated_at: string;
};

export type PrintType = {
  created_at: string;
  description: string;
  id: number;
  media: Media[];
  name: string;
  updated_at: string;
};
