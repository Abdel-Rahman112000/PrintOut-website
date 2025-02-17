"use client";
import { Box, Stack, Typography } from "@mui/material";
import ProductRowOfData from "./ProductList";
import { useContext } from "react";
import { HomeContext } from "../../context";

export default function ProductsSection() {
  const { productsRegularGiveaway } = useContext(HomeContext);
  if (
    Array.isArray(productsRegularGiveaway) &&
    productsRegularGiveaway.length == 0
  )
    return <></>;
  return (
    <Stack my={6} alignItems={"center"} justifyContent={"center"}>
      <Stack
        spacing={6}
        width={{
          xs: "100%",
          md: "90%",
        }}
      >
        {/* title */}
        <Stack direction={"row"} spacing={4}>
          <Box
            sx={{
              width: "6px",
              height: "30px",
              borderRadius: "10px",
              background: "#8A33FD",
            }}
          ></Box>
          <Typography variant="h5" fontWeight={800} fontSize={26}>
            Giveaways Products
          </Typography>
        </Stack>
        {/* product row */}
        <ProductRowOfData productsRegularGiveaway={productsRegularGiveaway} />
      </Stack>
    </Stack>
  );
}
