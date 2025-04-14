"use client";
import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import ProductsFiltersInMobileScreen from "../filters/mobile";
import ProductsFiltersInWebScreen from "../filters/web";
import ProductsList from "../products-list";
import Loader from "../products-list/Loader";
import { ProductsContext } from "../../context";
import { useContext, useRef } from "react";
import SkelatonProducts from "../products-list/SkelatonProducts";
import SkelatonProductCard from "../products-list/SkelatonProducts";
import SkelatonProductsFilters from "../products-list/SkelatonFilter";

export default function ProductsPageEntryPoint({
  productType,
}: {
  productType?: string;
}) {
  const { filter, loadingProducts } = useContext(ProductsContext);
  const isMobile = useMediaQuery("(max-width:768px)");

  // Track if it's the initial load
  const isFirstLoad = useRef(true);

  // If loading finishes, set first load to false
  if (!loadingProducts && isFirstLoad.current) {
    isFirstLoad.current = false;
  }

  return (
    <Grid container spacing={6}>
      {isMobile ? (
        <ProductsFiltersInMobileScreen />
      ) : (
        <Grid item xs={12} md={3}>
          {isFirstLoad.current ? (
            <SkelatonProductsFilters />
          ) : (
            <ProductsFiltersInWebScreen productType={productType} />
          )}
        </Grid>
      )}
      <Grid item xs={12} md={9}>
        {loadingProducts ? (
          <Box display="flex" flexWrap="wrap" gap={2} marginTop={8}>
            {[...Array(9)].map((_, index) => (
              <SkelatonProductCard key={index} />
            ))}
          </Box>
        ) : (
          <ProductsList />
        )}
      </Grid>
    </Grid>
  );
}
