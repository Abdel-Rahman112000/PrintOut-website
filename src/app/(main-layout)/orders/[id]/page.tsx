"use client";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { getMainOrder } from "@/utils/api/order/get-main-order";
import { Box, Container, Skeleton, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import MainOrderDetailsTabs from "./tabs";

export default function OrderDetailsPage() {
  const params = useParams();
  const { id } = params;
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
  return (
    <Container>
      <MainOrderDetailsTabs mainOrder={mainOrder} />
    </Container>
  );
}

const LoadingMainOrder = () => (
  <Stack
    direction={{
      md: "row",
      xs: "column",
    }}
  >
    <Skeleton variant="rounded" width={255} height={345} sx={{ m: 2 }} />
    <Box gap={1} flexGrow={1} p={2}>
      <Skeleton variant="rounded" height={162} />
      <Skeleton variant="rounded" height={162} sx={{ my: 2 }} />
    </Box>
  </Stack>
);
