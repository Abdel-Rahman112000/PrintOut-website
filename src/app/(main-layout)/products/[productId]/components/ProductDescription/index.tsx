import { Box, Grid, Stack, Typography } from "@mui/material";
import ProductDetailsTabs from "./NestedTabs";

export default function ProductDetailsDescription() {
  return (
    <Grid item xs={12} md={6}>
      {/* title */}
      <ProductDescriptionTitle />
      {/* tabs */}
      <ProductDetailsTabs />
    </Grid>
  );
}

const ProductDescriptionTitle = () => (
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
      Product Description
    </Typography>
  </Stack>
);
