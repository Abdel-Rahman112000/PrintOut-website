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
    <Container>
      <Stack>
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
              Now you can print what you with the settings you through our
              website or application with just few steps away.
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
    </Container>
  );
}

export default CustomPrintSection;
