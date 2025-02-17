"use client";

import { CartContext } from "@/contexts/cart/CartContext";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { CartItem } from "@/types/cart/CartItem";
import { getCartData } from "@/utils/api/cart/get-cart";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useState } from "react";

export const CartPageCxt = createContext<CartPageCxtType>({
  cartItems: [],
  totalPrice: 0,
  totalItems: 0,
  cartItemsQueryData: undefined,
  handleRefreshCartItemsData: () => {},
});

export const CartPageCxtProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const { children } = props;
  const { handleUpdateTotalQuantity } = useContext(CartContext);

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
        handleRefreshCartItemsData,
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
  cartItemsQueryData:
    | {
        carts: CartItem[];
        totalprice: string;
      }
    | undefined;
  handleRefreshCartItemsData(): void;
};
