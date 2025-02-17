"use client";

import RedeemIcon from "@mui/icons-material/Redeem";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  ButtonBase,
  ButtonProps,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { HomeContext } from "../../context";
import { useRouter } from "next/navigation";

const CustomButton = (props: ButtonProps) => (
  <Button
    fullWidth
    {...props}
    sx={{
      borderColor: "text.disabled",
      borderWidth: "2px !important",
      borderRadius: 2,
      color: "text.primary",
      px: 4,
      py: 4,
      ...props.sx,
    }}
  />
);

function PrintTypesCards() {
  const { printTypes } = useContext(HomeContext);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography
            width={"100%"}
            textAlign={"center"}
            variant="body1"
            fontSize={30}
            fontWeight={600}
          >
            Get started now.
            <br />
            select one of our options.
          </Typography>
          {/* Create custom print */}
          <Box
            sx={{
              mt: 5,
              backgroundImage:
                "linear-gradient(180deg, rgba(90,191,139,.99) 6%, rgba(24,190,222,.91) 100%),url(/assets/images/demo/type.png)",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              p: 6,
              borderRadius: "20px",
            }}
          >
            <Typography variant="h3" sx={{ color: "#fff", mb: 3 }}>
              Create <br /> custom print
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" sx={{ color: "#fff", mb: 3 }}>
                Upload your files and start ordering your custom print.
              </Typography>
              <IconButton sx={{ color: "#fff" }}>
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>

          {/* tasks */}
          <Grid container spacing={3} sx={{ mt: 5 }}>
            <Grid item md={4} sx={{ width: "100%" }}>
              <PrintProductType
                url="/assets/images/demo/Customize products.png"
                title="Upload your files"
                description="Print Your Ideas, Your Way\nCustomize Your Prints with Precision"
              />
              <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item md={4} sx={{ width: "100%" }}>
              <PrintProductType
                url="/assets/images/demo/Ready-Made Products.png"
                title="Customize Products"
                description="Create Your Perfect Product\nDesign It, We Deliver It"
              />
            </Grid>
            <Grid item md={4} sx={{ width: "100%" }}>
              <PrintProductType
                url="/assets/images/demo/Laser Cutting.png"
                title="Ready-made Products"
                description="Pre-Designed Perfection\nBrowse, Pick, and Enjoy"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PrintTypesCards;

const PrintProductType = (props: PrintProductTypeProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/custom-print");
  };

  return (
    <Stack
      alignItems={"start"}
      sx={{
        color: "#000",
        transition: "all 0.5s ease-in-out",
        py: 4,
        background:
          " radial-gradient(42.78% 42.79% at 50% 50%, rgba(255, 255, 255, 0.2) 0%, rgba(252, 252, 252, 0.2) 6%, rgba(204, 204, 204, 0.2) 100%)",
        borderRadius: "25px",
        ":hover": {
          "& .MuiTypography-root": {
            // color: "#fff",
          },
        },
      }}
    >
      <img
        src={props.url}
        width={300}
        height={200}
        alt="print type image"
        style={{ objectFit: "contain" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          width: 1,
          px: 3,
        }}
      >
        <Typography variant="body1" fontWeight={700} sx={{ fontSize: "22px" }}>
          {props.title}
        </Typography>
        <IconButton onClick={handleClick}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};

type PrintProductTypeProps = {
  url: string;
  title: string;
  description: string;
};
