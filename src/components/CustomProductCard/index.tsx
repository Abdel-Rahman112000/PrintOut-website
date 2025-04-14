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
import { useParams, useRouter } from "next/navigation";

function CustomProductCard({ product, addToCart }: PropsType) {
  const param = useParams();
  const router = useRouter();

  const isFavorite = product?.is_favorite ?? false;

  const productNameLen = product?.name?.length;
  const productName =
    productNameLen > 35 ? `${product?.name?.slice(0, 35)}..` : product?.name;

  const productDescLen = product?.description?.length || 0;
  const productDesc =
    productDescLen > 80
      ? `${product?.description?.slice(0, 80)}..`
      : product?.description;

  const productUrl = `/products/${param?.productName ?? product.type_id}/${
    product.id
  }`;

  const handleCardClick = () => {
    // Navigate only for type_id == 1 (Upload Design), or on card click
    if (product?.type_id === 1) {
      router.push(productUrl);
    }
  };

  return (
    <Paper
      sx={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        background:
          "linear-gradient(180deg, rgba(24, 190, 222, 0.5) 66.9%, rgba(90, 191, 139, 0.5) 100%)",
        minHeight: "450px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
      onClick={handleCardClick}
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
          position: "relative",
          overflow: "hidden",
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${product?.media?.[0]?.original_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            transition: "transform 0.3s ease-in-out",
          },
          "&:hover::before": {
            transform: "scale(1.1)",
          },
        }}
      >
        <IconButton
          sx={{ bgcolor: "#fff", ":hover": { bgcolor: "#fff" } }}
          onClick={(e) => e.stopPropagation()} // Prevent click bubbling
        >
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
            label={product?.brand?.name ?? ""}
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
          <Typography variant="body2">{productDesc}</Typography>
        </Box>
      </Stack>

      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          p: 2,
          alignItems: "end",
        }}
      >
        <Button
          startIcon={product?.type_id === 2 && <ShoppingCartIcon />}
          sx={{ bgcolor: "#40BFAC", borderRadius: 5 }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            if (product?.type_id === 2 && addToCart) {
              addToCart(product.id, product?.type_id, productName);
            } else if (product?.type_id === 1) {
              router.push(productUrl); // Navigate manually
            }
          }}
        >
          {product?.type_id === 1 ? "Upload Design" : "Add to Cart"}
        </Button>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography
            sx={{
              fontSize: "19px",
              fontWeight: 600,
              color: "#40BFAC",
            }}
          >
            {product?.product_price?.price ?? "_"} EGP
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default CustomProductCard;

type PropsType = {
  product: Product;
  addToCart?: (id: number, typeId: number, name: string) => void;
};
