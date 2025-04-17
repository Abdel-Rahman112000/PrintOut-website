"use client";

import { api } from "@/constants/api";
import { CartContext } from "@/contexts/cart/CartContext";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { CartItem } from "@/types/cart/CartItem";
import { getCartData } from "@/utils/api/cart/get-cart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

export const CartPageCxt = createContext<CartPageCxtType>({
  cartItems: [],
  totalPrice: 0,
  totalItems: 0,
  depositeNumber: "0",
  cartItemsQueryData: undefined,
  handleRefreshCartItemsData: () => {},
  selectedMethod: "cash",
  setSelectedMethod: () => {},
  handleCheckout: async () => {},
  loading: false,
});

export const CartPageCxtProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const { children } = props;
  const { handleUpdateTotalQuantity } = useContext(CartContext);
  const [selectedMethod, setSelectedMethod] = useState<"cash" | "visa">("cash");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    const headers = await getClientAuthHeaders();
    axios
      .post<{ data: string }>(
        api`client/paymob/intention`,
        { method: selectedMethod },
        { headers }
      )
      .then((res) => {
        router?.replace(res?.data?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const { data: cartItemsQueryData, refetch: refreshCartItemsQueryData } =
    useQuery({
      queryKey: [`cart-items-data`],
      queryFn: async () => {
        const headers = await getClientAuthHeaders();
        const response = await getCartData(headers);
        if (response?.carts) {
          handleUpdateTotalQuantity(response?.carts?.length);
        }
        return response;
      },
    });

  // TODO::declare and define helper methods
  function handleRefreshCartItemsData() {
    refreshCartItemsQueryData();
  }

  // ** return component ui
  return (
    <CartPageCxt.Provider
      value={{
        cartItemsQueryData,
        cartItems: cartItemsQueryData?.carts ?? [],
        totalPrice: Number(cartItemsQueryData?.totalprice ?? "0"),
        totalItems: cartItemsQueryData?.carts?.length ?? 0,
        depositeNumber: cartItemsQueryData?.deposit?.data?.value ?? "0",
        handleRefreshCartItemsData,
        selectedMethod,
        setSelectedMethod,
        handleCheckout,
        loading,
      }}
    >
      {children}
    </CartPageCxt.Provider>
  );
};

type PropsType = {
  children: ReactNode;
};
type CartPageCxtType = {
  cartItems: CartItem[];
  totalPrice: number;
  totalItems: number;
  depositeNumber: string;
  cartItemsQueryData:
    | {
        carts: CartItem[];
        totalprice: string;
      }
    | undefined;
  handleRefreshCartItemsData(): void;
  selectedMethod: "cash" | "visa";
  setSelectedMethod: React.Dispatch<React.SetStateAction<"cash" | "visa">>;
  handleCheckout: () => Promise<void>;
  loading: boolean;
};
