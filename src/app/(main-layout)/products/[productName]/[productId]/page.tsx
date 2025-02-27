import { Container, Grid } from "@mui/material";
import ProductDetailsMainInfo from "./components/productMainInfo";

import ProductSwiper from "./components/ProductSwiper";
import { getProduct } from "@/utils/api/product/get-product";
import { getServerAuthHeaders } from "@/libs/auth/getServerAuthHeaders";
import { notFound } from "next/navigation";

export default async function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const headers = await getServerAuthHeaders();

  const product = (await getProduct(headers, params?.productId)).data;

  console.log(product);

  if (!product) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ mt: "40px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <ProductSwiper product={product} />
        </Grid>
        <Grid item xs={12} md={7}>
          <ProductDetailsMainInfo product={product} />
        </Grid>
      </Grid>
    </Container>
  );
}
