import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import axios from "axios";
import { Order } from "@/types/common/Order";
import { CustomizeOptionType, PaperType } from "@/types/common/Order/Paper";

interface Root {
  status: boolean;
  message: string;
  data?: {
    color: CustomizeOptionType[];
    scaling: CustomizeOptionType[];
    size: PaperType[];
  };
}

export const getPapers = async (headers: AuthHeaders) => {
  return (
    await axios.get<Root>(api`client/papers`, {
      headers,
    })
  ).data;
};
