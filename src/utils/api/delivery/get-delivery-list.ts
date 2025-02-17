import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import axios from "axios";
import { DeliveryMan } from "@/types/delivery/DeliveryMan";

interface Root {
  status: boolean;
  message: string;
  data?: DeliveryMan[];
}

export const getDeliveryMenList = async (headers: AuthHeaders) => {
  return (
    await axios.get<Root>(api`client/messages/list`, {
      headers,
    })
  ).data;
};
