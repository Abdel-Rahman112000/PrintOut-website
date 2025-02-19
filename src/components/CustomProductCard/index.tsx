import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RoundedButton from "@/components/RoundedButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Product } from "@/types/common/Product";
import Link from "next/link";
function CustomProductCard({ product }: { product: Product }) {
  const isFavorite = product?.is_favorite ?? false;
  const productNameLen = product?.name?.length;
  const productName =
    productNameLen > 20 ? `${product?.name?.slice(0, 15)}..` : product?.name;
  return (
    <Stack component={Link} href={`/products/${product.id}`}>
      <Paper
        sx={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          background:
            "linear-gradient(180deg, rgba(24, 190, 222, 0.5) 66.9%, rgba(90, 191, 139, 0.5) 100%)",
        }}
      >
        <Stack
          sx={{
            p: 2,
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            height: "280px",
            width: "100%",
            borderStartStartRadius: "12px",
            borderStartEndRadius: "12px",
            backgroundImage: `url(${product?.media?.[0]?.original_url})`,
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
            {/* {brandImg && (
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
          )} */}
            <Chip
              label={product?.type?.name ?? ""}
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
              variant="body1"
              fontWeight={600}
              sx={{ fontSize: "16px", fontWeight: "600" }}
            >
              {productName}
            </Typography>
            <Typography variant="body2">product description</Typography>
          </Box>
        </Stack>
        <Stack
          sx={{ flexDirection: "row", justifyContent: "space-between", p: 2 }}
        >
          <Button
            startIcon={<ShoppingCartIcon />}
            sx={{ bgcolor: "#40BFAC", borderRadius: 5 }}
            //   onClick={() => {
            //     AddItemToCard(product.id, product?.type_id);
            //   }}
          >
            Add to Cart
          </Button>
          {/* product price */}
          {product?.product_price?.price && (
            <Stack alignItems={"center"} justifyContent={"center"}>
              <Typography
                sx={{
                  fontSize: "19px",
                  fontWeight: 600,
                  color: "#40BFAC",
                }}
              >
                {product?.product_price?.price ?? "_"}$
              </Typography>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}

export default CustomProductCard;
