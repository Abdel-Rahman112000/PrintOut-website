import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "@/types/common/Product";
import Link from "next/link";
import { useParams } from "next/navigation";

function CustomProductCard({ product, addToCart }: PropsType) {
  const isFavorite = product?.is_favorite ?? false;
  const productNameLen = product?.name?.length;
  const productName =
    productNameLen > 20 ? `${product?.name?.slice(0, 15)}..` : product?.name;
  const param = useParams();

  return (
    <Link
      href={`/products/${param.productName ?? product.type_id}/${product.id}`}
      passHref
    >
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
            <Chip
              label={product?.type?.name ?? ""}
              variant="filled"
              sx={{ bgcolor: "#1ABFDC", color: "#fff", fontSize: 12 }}
            />
          </Stack>
        </Stack>
        <Stack
          sx={{ flexDirection: "row", justifyContent: "space-between", p: 2 }}
        >
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
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when adding to cart
              addToCart && addToCart(product.id, product?.type_id);
            }}
          >
            Add to Cart
          </Button>
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
    </Link>
  );
}

export default CustomProductCard;

type PropsType = {
  product: Product;
  addToCart?: (id: number, typeId: number) => void;
};
