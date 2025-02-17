import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import axios from "axios";
import { Order } from "@/types/common/Order";

interface Root {
  status: boolean;
  message: string;
  data?: Order;
}

export const getOrder = async (
  headers: AuthHeaders,
  orderId: string | number
) => {
  return (
    await axios.get<Root>(api`client/cart/${orderId}`, {
      headers,
    })
  ).data;
};
