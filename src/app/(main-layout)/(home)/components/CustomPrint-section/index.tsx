"use client";
import {
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import leftImg from "@/assets/images/leftImg.png";
import rightImg from "@/assets/images/rightImg.png";
import { useRouter } from "next/navigation";
function CustomPrintSection() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      pt={10}
    >
      <Stack
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
          className="hvr-float-shadow"
          sx={{
            width: "200px",
            transition: "all 0.5s ease",
            ":hover": {
              backgroundColor: "#55bf91",
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
  );
}

export default CustomPrintSection;
