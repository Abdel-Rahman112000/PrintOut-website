import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import OnClientCheckAuth from "@/components/check-auth";
import { $Heights } from "@/constants/sizes";
import { CartContextProvider } from "@/contexts/cart/CartContext";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

// Icons
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Link from "next/link";

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack
      component={"body"}
      bgcolor={"background.default"}
      sx={{
        maxWidth: "100vw",
        overflowX: "hidden",
        transition: "background-color 500ms ease-out",
        ".filepond--panel-root": {
          bgcolor: "background.paper",
        },
        ".filepond--drop-label": {
          color: "primary.main",
        },
      }}
      position={"relative"}
    >
      <CartContextProvider>
        <OnClientCheckAuth />
        <Navbar />
        <Box
          sx={{
            paddingTop: `${$Heights.Navbar}px`,
          }}
        >
          {children}
          <ToastContainer position="bottom-right" />
        </Box>
        <Footer />
      </CartContextProvider>
      <Tooltip title="Chat" placement="left">
        <IconButton
          component={Link}
          href="/chat"
          sx={{
            position: "fixed",
            bottom: "3%",
            right: "4%",
            zIndex: "10",
            bgcolor: "#40BFAC",
            color: "#fff",
            transition: "all 0.5s ease-in-out",

            ":hover": {
              bgcolor: "#40BFAC",
              color: "#fff",
              transform: "scale(1.02)",
            },
          }}
        >
          <QuestionAnswerIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default MainLayout;
