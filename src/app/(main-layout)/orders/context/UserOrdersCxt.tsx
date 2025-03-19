"use client";

import { api } from "@/constants/api";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { Order } from "@/types/common/Order";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type ActiveTabType = "Track_Order" | "Tracking" | "Addresses";

export const UserOrdersCxt = createContext<UserOrdersCxtType>({
  orders: [],
  loadingOrders: false,
  handleChange: () => {},
  value: 0,
  setValue: () => {},
  setActiveTabName: () => {},
  activeTabName: "Track_Order",
});

const fetchOrdersData = async () => {
  const headers = await getClientAuthHeaders();
  const response = await axios.get<ResponseType>(api`client/order`, {
    headers,
  });

  console.log(response.data.data);
  return response.data;
};

export const UserOrdersCxtProvider = (props: PropsType) => {
  const [value, setValue] = useState(0);
  const [activeTabName, setActiveTabName] =
    useState<ActiveTabType>("Track_Order");
  // TODO::declare and define component state and variables
  const { children } = props;
  const query = useQuery({
    queryKey: [`user-order-data`],
    queryFn: fetchOrdersData,
  });

  // TODO::declare and define helper methods
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // ** return component ui
  return (
    <UserOrdersCxt.Provider
      value={{
        orders: [
          ...(query?.data?.data?.past ?? []),
          ...(query?.data?.data?.current ?? []),
        ],
        loadingOrders: query?.isLoading,
        handleChange,
        value,
        setValue,
        setActiveTabName,
        activeTabName,
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
  value: number;
  orders: Order[];
  loadingOrders: boolean;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  setValue: Dispatch<SetStateAction<number>>;
  setActiveTabName: Dispatch<SetStateAction<ActiveTabType>>;
  activeTabName: ActiveTabType;
};
