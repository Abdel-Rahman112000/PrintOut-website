import { Box, Container, Grid, Stack } from "@mui/material";
import ProductDetailsMainInfo from "./components/productMainInfo";
import ProductSwiper from "./components/ProductSwiper";
import { getProduct } from "@/utils/api/product/get-product";
import { getServerAuthHeaders } from "@/libs/auth/getServerAuthHeaders";
import { notFound, useParams } from "next/navigation";
import VideoCard from "./components/VideoCard";
import { getProductsList } from "@/utils/api/product/get-products-list";
import ProductsSection from "@/app/(main-layout)/(home)/components/Products-section";

export default async function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const headers = await getServerAuthHeaders();

  const product = (await getProduct(headers, params?.productId)).data;

  if (!product) {
    notFound();
  }

  const products = await getProductsList(headers, {
    params: { type_id: product?.type_id }, // ← use real product type_id
  });

  return (
    <>
      <Container
        sx={{
          maxWidth: {
            xs: "sm",
            sm: "md",
            md: "lg",
            xl: "xl",
          },
          mt: "40px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <ProductSwiper product={product} />
          </Grid>
          <Grid item xs={12} md={7}>
            <ProductDetailsMainInfo product={product} />
          </Grid>
          <Grid item xs={0} md={2}></Grid>

          <Grid item xs={12} md={8}>
            <VideoCard product={product} />
          </Grid>
          <Grid item xs={0} md={2}></Grid>
        </Grid>
        <ProductsSection products={products} title={"Related Products"} />
      </Container>
    </>
  );
}
