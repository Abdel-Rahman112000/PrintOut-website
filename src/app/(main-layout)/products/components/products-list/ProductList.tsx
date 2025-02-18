"use client";
// MUI
import { Grid } from "@mui/material";
// Hooks
import { useContext } from "react";
import { ProductsContext } from "../../context";
import { CartContext } from "@/contexts/cart/CartContext";
import CustomProductCard from "@/components/CustomProductCard";

// export default function ProductsDataList() {
//   // get products from context
//   return (

//   );
// }

export const ProductCard = () => {
  const { products } = useContext(ProductsContext);

  const { AddItemToCard } = useContext(CartContext);
  // is favorite
  // brand image
  // const brandTitle = product?.brand?.name;
  // const brandImg = product?.brand?.media?.[0]?.original_url;
  // product type

  return (
    <Grid container spacing={2}>
      {products?.map((product) => (
        <Grid key={product.id} item md={4} sx={{ mt: 4, width: "100%" }}>
          <CustomProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
