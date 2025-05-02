"use client";

import { api } from "@/constants/api";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext<CartContextType>({
  totalAmount: 0,
  totalQuantity: 0,
  cartItems: [],
  AddItemToCard: (id: number, typeId: number, name: string) => {},
  RemoveItemFromCard: (id: number) => {},
  handleUpdateTotalQuantity: (num: number) => {},
});

export const CartContextProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const { children } = props;
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // TODO::declare and define helper methods
  const handleUpdateTotalQuantity = (num: number) => {
    setTotalQuantity(num);
  };

  async function AddItemToCard(id: number, typeId: number, name: string) {
    const existingItem = cartItems?.find((item) => item.productId == id);
    const headers = await getClientAuthHeaders();
    const body = {
      note: "",
      type_id: typeId,
      order_details: [
        {
          product_id: id,
          qty: 1,
        },
      ],
    };

    axios
      .post(api`client/cart`, body, { headers })
      .then(() => {
        if (existingItem) {
          setCartItems((prev) =>
            prev.map((item) => {
              if (item.productId == id)
                return { ...item, amount: item.amount + 1 };
              return item;
            })
          );
          toast.success(`Product "${name}"  is added to cart successfully.`);
        } else {
          setCartItems((prev) => [...prev, { productId: id, amount: 1 }]);
          toast.success(
            <Box sx={{ fontSize: "22px" }}>
              <p>Product is added to cart successfully.</p>
              <Button variant="text" onClick={() => router.push("/cart")}>
                Go to Checkout
              </Button>
            </Box>,
            {
              autoClose: 5000,
              position: "bottom-right",
              style: {
                width: "500px",
              },
            }
          );
        }
        setTotalQuantity((prev) => prev + 1);
      })
      .catch((err) => {
        if (err.status == 401) {
          toast.warn("You must login firstly.");
          router.push("/auth/login");
        } else {
          toast.error("Unexpected error");
        }
      });
  }

  function RemoveItemFromCard(id: number) {
    const existingItem = cartItems?.find((item) => item.productId == id);
    if (existingItem) {
      if (existingItem.amount == 1) {
        setCartItems((prev) => prev.filter((ele) => ele.productId != id));
      } else {
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.productId == id)
              return { ...item, amount: item.amount - 1 };
            return item;
          })
        );
      }

      setTotalQuantity((prev) => prev - 1);
    }
  }

  // ** return component ui
  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        totalQuantity,
        AddItemToCard,
        RemoveItemFromCard,
        handleUpdateTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

type PropsType = { children: ReactNode };
type CartItem = { productId: number; amount: number };
type CartContextType = {
  totalAmount: number;
  totalQuantity: number;
  cartItems: CartItem[];
  RemoveItemFromCard(id: number): void;
  AddItemToCard(id: number, typeId: number, name: string): void;
  handleUpdateTotalQuantity: (num: number) => void;
};
