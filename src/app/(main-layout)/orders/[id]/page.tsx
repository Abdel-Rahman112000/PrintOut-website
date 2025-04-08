"use client";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { getMainOrder } from "@/utils/api/order/get-main-order";
import { Box, Container, Skeleton, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import MainOrderDetailsTabs from "./tabs";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  // /client/order/main/29
  const { data: mainOrder, isLoading } = useQuery({
    queryKey: [`main-order-data`],
    queryFn: async () => {
      const headers = await getClientAuthHeaders();
      const response = await getMainOrder(headers, +id);

      return response?.data;
    },
  });

  // loading case
  if (isLoading) return <LoadingMainOrder />;

  // Show main order data
  return <MainOrderDetailsTabs mainOrder={mainOrder} />;
}

const LoadingMainOrder = () => (
  <Stack
    direction={{
      md: "row",
      xs: "column",
    }}
    sx={{ mt: 3 }}
  >
    <Skeleton variant="rounded" width={1000} height={345} sx={{ m: 2 }} />
  </Stack>
);
