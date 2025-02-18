import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import ProductDetailsImage from "./components/productImage";
import ProductDetailsMainInfo from "./components/productMainInfo";
import ProductDetailsDescription from "./components/ProductDescription";
import VideoDesciption from "./components/ProductVideo";
import { ProductCard } from "../components/products-list/ProductList";

export default function ProductDetails() {
  return (
    <Container maxWidth="xl">
      <Grid container>
        {/* Image */}
        <Grid item xs={12} md={5}>
          <ProductDetailsImage />
        </Grid>
        {/* main info */}
        <Grid item xs={12} md={7}>
          <ProductDetailsMainInfo />
        </Grid>
        {/* description */}
        <Grid container my={4}>
          <ProductDetailsDescription />
          <VideoDesciption />
        </Grid>
        <Grid item xs={12}>
          {/* title */}
          <Stack direction={"row"} spacing={4}>
            <Box
              sx={{
                width: "6px",
                height: "30px",
                borderRadius: "10px",
                background: "#FA4A0C",
              }}
            ></Box>
            <Typography variant="h5" fontWeight={800} fontSize={26}>
              Similar Products
            </Typography>
          </Stack>
          <ProductCard />
        </Grid>
      </Grid>
    </Container>
  );
}
