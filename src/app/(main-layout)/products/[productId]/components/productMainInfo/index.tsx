// Icons
import CommentIcon from "@mui/icons-material/Comment";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";

// MUI
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  IconButton,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

export default function ProductDetailsMainInfo() {
  return (
    <Stack spacing={3} p={"10px"}>
      <ProductDetailsBreadcrumbs />
      <Typography variant="h3" fontWeight={700} fontSize={22}>
        Brand
      </Typography>
      <Typography variant="h4" fontSize={22} fontWeight={700}>
        White Mug with square print
      </Typography>
      {/* rating & comments */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"start"}
        spacing={3}
      >
        <Rating name="product-rate" defaultValue={3.5} precision={0.5} />
        <Typography variant="body2" fontSize={16} color={"#807D7E"}>
          3.5
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"start"}
          spacing={2}
          color={"#807D7E"}
        >
          <CommentIcon />
          <Typography variant="body2" fontSize={16}>
            120 comment
          </Typography>
        </Stack>
      </Stack>
      {/* size */}
      <Stack spacing={3}>
        <Stack
          spacing={3}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"start"}
        >
          <Typography variant="body1" fontSize={18} fontWeight={700}>
            Select Size
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"start"}
            spacing={2}
            color={"#807D7E"}
          >
            <Typography variant="body2" fontSize={16}>
              Size Guide
            </Typography>
            <ArrowRightAltIcon />
          </Stack>
        </Stack>
        <Stack
          spacing={3}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"start"}
        >
          <Chip label="XS" sx={{ borderRadius: "8px" }} variant="outlined" />
          <Chip label="S" sx={{ borderRadius: "8px" }} variant="outlined" />
          <Chip label="M" sx={{ borderRadius: "8px" }} variant="outlined" />
          <Chip
            label="L"
            sx={{ borderRadius: "8px", bgcolor: "#3C4242", color: "#fff" }}
            variant="filled"
          />
          <Chip label="XL" sx={{ borderRadius: "8px" }} variant="outlined" />
        </Stack>
      </Stack>
      {/* Color */}
      <Stack spacing={3}>
        <Typography variant="body1" fontSize={18} fontWeight={700}>
          Colours Available
        </Typography>
        <Stack
          spacing={3}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"start"}
        >
          <Box
            width={24}
            height={24}
            sx={{
              borderRadius: "50%",
              bgcolor: "#3C4242",
              border: "3px solid gold",
              padding: 1,
            }}
          />
          <Box
            width={24}
            height={24}
            sx={{ borderRadius: "50%", bgcolor: "#EDD146" }}
          />
          <Box
            width={24}
            height={24}
            sx={{ borderRadius: "50%", bgcolor: "#eb84b0" }}
          />
          <Box
            width={24}
            height={24}
            sx={{ borderRadius: "50%", bgcolor: "#9c1f35" }}
          />
        </Stack>
      </Stack>
      {/* Actions */}
      <Stack spacing={4} direction={"row"} alignItems={"center"}>
        <Button
          variant="contained"
          className="hvr-bounce-to-right"
          startIcon={<ShoppingCartOutlinedIcon />}
          sx={{ color: "#fff", bgcolor: "#40BFAC", p: "10px" }}
        >
          Add to Cart
        </Button>
        <Button variant="outlined" sx={{ p: "10px" }}>
          Upload Custom Design
        </Button>
      </Stack>
      <Divider />
      <Stack spacing={8} direction={"row"} flexWrap={"wrap"}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <IconButton>
            <CreditCardOutlinedIcon />
          </IconButton>
          <Typography variant="body2" fontSize={17} fontWeight={600}>
            Secure payment
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <IconButton>
            <LocalShippingOutlinedIcon />
          </IconButton>
          <Typography variant="body2" fontSize={17} fontWeight={600}>
            Free shipping
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <IconButton>
            <AssignmentReturnOutlinedIcon />
          </IconButton>
          <Typography variant="body2" fontSize={17} fontWeight={600}>
            Free Shipping & Returns
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

const ProductDetailsBreadcrumbs = () => (
  <Breadcrumbs aria-label="breadcrumb">
    <Link underline="hover" color="inherit" href="/">
      Shop
    </Link>
    <Link
      underline="hover"
      color="inherit"
      href="/material-ui/getting-started/installation/"
    >
      Ready made products
    </Link>
    <Typography sx={{ color: "text.primary" }}>Mugs</Typography>
  </Breadcrumbs>
);
