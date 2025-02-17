"use client";
import { Grid, Stack, useMediaQuery } from "@mui/material";
import ProductsFiltersInMobileScreen from "../filters/mobile";
import ProductsFiltersInWebScreen from "../filters/web";
import ProductsList from "../products-list";
import { Product } from "@/types/common/Product";
import Loader from "../products-list/Loader";
import { ProductsContext } from "../../context";
import { useContext } from "react";

export default function ProductsPageEntryPoint() {
  const { filter, loadingProducts } = useContext(ProductsContext);
  // Check if the screen width is less than 768px (mobile)

  const isMobile = useMediaQuery("(max-width:768px)");
  if (loadingProducts)
    return (
      <Stack
        sx={{
          height: "75vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </Stack>
    );
  return (
    <Grid container spacing={6}>
      {isMobile ? (
        <ProductsFiltersInMobileScreen />
      ) : (
        <Grid item xs={12} md={3}>
          <ProductsFiltersInWebScreen />
        </Grid>
      )}
      <Grid item xs={12} md={9}>
        <ProductsList />
      </Grid>
    </Grid>
  );
}
