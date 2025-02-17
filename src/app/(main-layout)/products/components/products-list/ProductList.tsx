"use client";

// MUI
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

// Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RoundedButton from "@/components/RoundedButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Hooks
import { useContext } from "react";
import { ProductsContext } from "../../context";
import { Product } from "@/types/common/Product";
import { CartContext } from "@/contexts/cart/CartContext";
import Link from "next/link";

export default function ProductsDataList() {
  // get products from context
  const { products } = useContext(ProductsContext);
  return (
    <Grid container spacing={2}>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}

const ProductCard = (props: ProductCardPropsType) => {
  const { product } = props;
  const { AddItemToCard } = useContext(CartContext);
  const imgUrl = product?.media?.[0]?.original_url;
  // is favorite
  const isFavorite = product?.is_favorite ?? false;
  // brand image
  const brandTitle = product?.brand?.name;
  const brandImg = product?.brand?.media?.[0]?.original_url;
  // product type
  const productType = product?.type?.name;
  // prepare product name
  const productNameLen = product?.name?.length;
  const productName =
    productNameLen > 20 ? `${product?.name?.slice(0, 15)}..` : product?.name;

  return (
    <Grid item md={4}>
      <Paper
        sx={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Adds a gray shadow
        }}
      >
        <Stack
          sx={{
            p: 2,
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            height: "280px",
            borderStartStartRadius: "12px",
            borderStartEndRadius: "12px",
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <IconButton sx={{ bgcolor: "#fff", ":hover": { bgcolor: "#fff" } }}>
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "#ff0000b0" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <Stack
            width={"100%"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {brandImg && (
              <Tooltip title={brandTitle} placement="top">
                <img
                  src={brandImg}
                  alt={`brand:${brandTitle}`}
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </Tooltip>
            )}
            <Chip
              label={productType ?? ""}
              variant="filled"
              sx={{ bgcolor: "#1ABFDC", color: "#fff", fontSize: 12 }}
            />
          </Stack>
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          {/* product name */}
          <Box>
            <Typography
              component={Link}
              href={`/products/${product.id}`}
              variant="body1"
              fontWeight={600}
              sx={{ fontSize: "16px", fontWeight: "600" }}
            >
              {productName}
            </Typography>
            <Typography variant="body2">product description</Typography>
          </Box>
          {/* product price */}
          {product?.product_price?.price && (
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                bgcolor: "#F6F6F6",
                height: "30",
                fontSize: "17px",
                borderRadius: "10px",
                px: 2,
                py: 0.5,
              }}
            >
              $ {product?.product_price?.price ?? "_"}
            </Stack>
          )}
        </Stack>
        {/* <Button
        startIcon={<ShoppingCartIcon />}
        sx={{ bgcolor: "#40BFAC", borderRadius: 0 }}
        className="hvr-bounce-to-right"
        onClick={() => {
          AddItemToCard(product.id, product?.type_id);
        }}
      >
        Add to Cart
      </Button> */}
      </Paper>
    </Grid>
  );
};

type ProductCardPropsType = {
  product: Product;
};
