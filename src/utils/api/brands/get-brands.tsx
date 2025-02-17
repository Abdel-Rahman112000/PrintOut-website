import axios from "axios";
import { api } from "@/constants/api";
import { AuthHeaders } from "@/types/AuthHeaders";
import { Brand } from "@/types/common/Brand/Brand";

interface Root {
  status: boolean;
  message: string;
  data: Brand[];
}

export const getBrandsData = async (headers: AuthHeaders) => {
  return (
    await axios.get<Root>(api`client/brands`, {
      headers,
    })
  ).data.data;
};
