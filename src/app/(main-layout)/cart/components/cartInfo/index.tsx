"use client";

import RoundedButton from "@/components/RoundedButton";
import { Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { CartPageCxt } from "../../context/CartPageCxt";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import axios from "axios";
import { api } from "@/constants/api";
import { useRouter } from "next/navigation";
import AddressesList from "./AddressesList";

export default function CartInformation() {
  const { totalItems, totalPrice } = useContext(CartPageCxt);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async (method: "cash" | "visa") => {
    setLoading(true);
    const headers = await getClientAuthHeaders();
    axios
      .post<{ data: string }>(
        api`client/paymob/intention`,
        { method },
        { headers }
      )
      .then((res) => {
        router?.replace(res?.data?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Stack
      p={3}
      spacing={3}
      border={"1px solid lightgray"}
      borderRadius={"10px"}
    >
      {/* summary information */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="body2" fontWeight={600} fontSize={20}>
          Total Items :{" "}
        </Typography>
        <Typography variant="body2" fontWeight={600} fontSize={20}>
          {totalItems} item(s)
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="body2" fontWeight={600} fontSize={20}>
          Total Amount :{" "}
        </Typography>
        <Typography variant="body2" fontWeight={600} fontSize={20}>
          {totalPrice} $
        </Typography>
      </Stack>
      {/* addresses */}
      <AddressesList />
      {/* buttons */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <RoundedButton
          disabled={loading || totalItems == 0}
          onClick={() => {
            handleCheckout("visa");
          }}
        >
          Visa
        </RoundedButton>

        <RoundedButton
          disabled={loading || totalItems == 0}
          onClick={() => {
            handleCheckout("cash");
          }}
        >
          Cash
        </RoundedButton>
      </Stack>
    </Stack>
  );
}
