import axios from "axios";
import { api } from "@/constants/api";
import { AuthHeaders } from "@/types/AuthHeaders";
import { CartItem } from "@/types/cart/CartItem";

interface Root {
  status: boolean;
  message: string;
  data: { carts: CartItem[]; totalprice: string; deposit: DepositType };
}

export const getCartData = async (headers: AuthHeaders) => {
  return (
    await axios.get<Root>(api`client/cart`, {
      headers,
    })
  ).data.data;
};

type DepositType = {
  created_at: string;
  data: {
    key: string;
    value: string;
    status: number;
  };
  id: number;
  type: string;
  updated_at: string;
};
