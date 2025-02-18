"use client";
import { Box, Stack, Typography } from "@mui/material";
import { Product } from "@/types/common/Product";

export const ProductCard = ({ product }: { product: Product }) => {
  const len = product?.name?.length;
  const productName =
    len > 10 ? `${product?.name?.slice(0, 15)}..` : product?.name;

  return (
    <Stack
      sx={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        mb: 3,
        borderRadius: "15px",
      }}
    >
      <img
        width={"100%"}
        height={260}
        src={product?.media?.[0]?.original_url ?? ""}
        style={{ borderRadius: "5px", objectFit: "fill" }}
      />
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
          py: 2,
        }}
      >
        <Typography variant="body1" sx={{ fontSize: "16px", fontWeight: 700 }}>
          {productName}
        </Typography>
        <Box
          sx={{
            width: "90px",
            height: "40px",
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
            }}
          >
            {product?.product_price?.price ?? ""} $
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};
