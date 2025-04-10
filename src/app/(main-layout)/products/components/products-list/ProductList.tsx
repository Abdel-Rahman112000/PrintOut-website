"use client";
// MUI
import { Grid } from "@mui/material";
// Hooks
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context";
import { CartContext } from "@/contexts/cart/CartContext";
import CustomProductCard from "@/components/CustomProductCard";

export const ProductCard = () => {
  const { products, searchParams, handleChangeSearchParams, limit, setLimit } =
    useContext(ProductsContext);

  const { AddItemToCard } = useContext(CartContext);
  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 500;

      if (isNearBottom) {
        setLimit((prevLimit) => {
          const newLimit = prevLimit + 9;

          // Update searchParams with new limit
          handleChangeSearchParams({ ...searchParams, limit: newLimit });

          return newLimit;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [products, searchParams]);

  return (
    <Grid container spacing={2}>
      {products?.map((product) => (
        <Grid key={product.id} item md={4} sx={{ mt: 4, width: "100%" }}>
          <CustomProductCard product={product} addToCart={AddItemToCard} />
        </Grid>
      ))}
    </Grid>
  );
};
