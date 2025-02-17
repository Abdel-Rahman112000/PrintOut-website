import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import axios from "axios";
import { Address } from "@/types/common/User";

interface Root {
  status: boolean;
  message: string;
  data: Address[];
}

export const getMyAddresses = async (headers: AuthHeaders) => {
  return (
    await axios.get<Root>(api`client/address`, {
      headers,
    })
  ).data;
};
