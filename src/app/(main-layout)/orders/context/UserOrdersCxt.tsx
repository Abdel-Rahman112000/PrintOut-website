"use client";

import { api } from "@/constants/api";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { Order } from "@/types/common/Order";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, ReactNode } from "react";

export const UserOrdersCxt = createContext<UserOrdersCxtType>({
  orders: [],
  loadingOrders: false,
});

const fetchOrdersData = async () => {
  const headers = await getClientAuthHeaders();
  const response = await axios.get<ResponseType>(api`client/order`, {
    headers,
  });

  return response.data;
};

export const UserOrdersCxtProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const { children } = props;
  const query = useQuery({
    queryKey: [`user-order-data`],
    queryFn: fetchOrdersData,
  });

  // TODO::declare and define helper methods

  // ** return component ui
  return (
    <UserOrdersCxt.Provider
      value={{
        orders: [
          ...(query?.data?.data?.past ?? []),
          ...(query?.data?.data?.current ?? []),
        ],
        loadingOrders: query?.isLoading,
      }}
    >
      {children}
    </UserOrdersCxt.Provider>
  );
};

type ResponseType = {
  data: { current: Order[]; past: Order[] };
  message: string;
  status: boolean;
};
type PropsType = {
  children: ReactNode;
};

type UserOrdersCxtType = {
  orders: Order[];
  loadingOrders: boolean;
};
