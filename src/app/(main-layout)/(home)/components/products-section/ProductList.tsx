"use client";
import {
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useRef } from "react";

// Icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Images
import leftImg from "@/assets/images/leftImg.png";
import rightImg from "@/assets/images/rightImg.png";
import RoundedButton from "@/components/RoundedButton";
import { HomeContext } from "../../context";
import { Product } from "@/types/common/Product";
import { CartContext } from "@/contexts/cart/CartContext";
import { useRouter } from "next/navigation";

export default function ProductRowOfData({
  productsRegularGiveaway,
}: {
  productsRegularGiveaway: Product[] | undefined;
}) {
  // handle and declare component state and variables
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:768px)");
  const rowRef = useRef<HTMLDivElement | null>(null);

  // methods
  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <Stack>
      <Box sx={{ position: "relative" }}>
        {/* actions */}
        <IconButton
          onClick={scrollLeft}
          sx={{
            position: "absolute",
            top: "44%",
            left: "2%",
            zIndex: 10,
            background: "#d3d3d3db",
            ":hover": {
              background: "#d3d3d3db",
              boxShadow: "2.5px 2.5px 3px #d3d3d3db",
            },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={scrollRight}
          sx={{
            position: "absolute",
            top: "44%",
            right: "2%",
            zIndex: 10,
            background: "#d3d3d3db",
            ":hover": {
              background: "#d3d3d3db",
              boxShadow: "2.5px 2.5px 3px #d3d3d3db",
            },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
        <Stack
          ref={rowRef}
          direction={"row"}
          spacing={6}
          alignItems={"center"}
          justifyContent={"start"}
          sx={{
            height: "390px",
            overflowX: "auto",
          }}
          minHeight={"450px"}
        >
          {/* product cards */}
          {Array.isArray(productsRegularGiveaway) &&
            productsRegularGiveaway?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </Stack>
      </Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ marginTop: "8rem" }}
      >
        <Stack
          width={{
            sx: "100%",
            md: "50%",
          }}
          height={630}
          spacing={4}
          alignItems={"start"}
          justifyContent={"center"}
          sx={{
            backgroundImage: `url(${leftImg.src})`,
            backgroundSize: "cover",
            padding: {
              xs: "10px",
              md: "100px",
            },
          }}
        >
          <Typography
            variant="body1"
            fontSize={30}
            fontWeight={800}
            color={"#fff"}
            my={2}
          >
            READY TO MAKE YOUR CUSTOM PRINT ?
          </Typography>
          <Typography variant="body2" fontSize={18} color={"#fff"}>
            Now you can print what you with the settings you through our website
            or application with just few steps away.
          </Typography>

          <Button
            className="hvr-curl-top-right"
            sx={{
              width: "200px",
              borderRadius: 0,
              bgcolor: "#fff",
              color: "red",
              transition: "all 0.5s ease",
              ":hover": {
                color: "#fff",
                bgcolor: "red",
                transform: "scale(1.15)",
              },
            }}
            onClick={() => {
              router.push("/custom-print");
            }}
          >
            Start Now
          </Button>
        </Stack>
        {!isMobile && (
          <img src={rightImg.src} width={"50%"} height={630} alt="image" />
        )}
      </Stack>
    </Stack>
  );
}

const LoadingCard = () => (
  <Stack spacing={4}>
    <Skeleton
      variant="rectangular"
      width={265}
      height={260}
      sx={{ borderRadius: "12px" }}
    />
    <Skeleton
      variant="rectangular"
      width={265}
      height={45}
      sx={{ borderRadius: "12px" }}
    />
  </Stack>
);

const ProductCard = ({ product }: { product: Product }) => {
  const len = product?.name?.length;
  const productName =
    len > 20 ? `${product?.name?.slice(0, 18)}..` : product?.name;
  const { AddItemToCard } = useContext(CartContext);

  return (
    <Stack spacing={4} p={1} minWidth={275} px={"5px"} className="hvr-float">
      <img
        width={265}
        height={260}
        className="hvr-shadow"
        src={product?.media?.[0]?.original_url ?? ""}
        style={{ borderRadius: "12px", objectFit: "fill" }}
      />
      <Stack spacing={2}>
        <Tooltip title={product?.name}>
          <Typography variant="h6" fontSize={19} fontWeight={600}>
            {productName}
          </Typography>
        </Tooltip>

        {/* actions */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "82.31px",
              height: "40px",
              borderRadius: "8px",
              background: "#F6F6F6",
              fontWeight: 600,
            }}
          >
            {product?.product_price?.price ?? ""} $
          </Stack>

          <Button
            variant="contained"
            className="hvr-bounce-to-right"
            sx={{ bgcolor: "#40BFAC", borderRadius: 0 }}
            startIcon={<AddShoppingCartIcon />}
            onClick={() => {
              AddItemToCard(product.id, product?.type_id);
            }}
          >
            Add To Cart
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
