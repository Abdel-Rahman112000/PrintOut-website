"use client";

import Logo from "@/assets/images/printout-logo-white.png";
import {
  Avatar,
  Badge,
  Box,
  ButtonBase,
  Container,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import NavLinks from "./NavLinks";
import { $Heights } from "@/constants/sizes";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect, useContext } from "react";
import NavDrawer from "./Drawer";
import { useAnimation, motion } from "framer-motion";
import Link from "next/link";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LoginIcon from "@mui/icons-material/Login";

import { useAuth } from "@/contexts/AuthProvider";
import UserDropdown from "../layout/user-dropdown";
import { CartContext } from "@/contexts/cart/CartContext";
import { usePathname, useRouter } from "next/navigation";

const ANIMATION_DURATION = 0.4;
const animationStatusInit: AnimationStatus = {
  animating: false,
  direction: "unset",
};
let animationStatus: AnimationStatus = animationStatusInit;
type AnimationStatus = {
  animating: boolean;
  direction: "hide" | "show" | "unset";
};

function startAnimation(
  cb: () => void,
  direction: AnimationStatus["direction"]
) {
  if (animationStatus.animating || direction === animationStatus.direction) {
    return;
  }
  animationStatus = {
    animating: true,
    direction,
  };
  cb();
  setTimeout(() => {
    animationStatus = animationStatusInit;
  }, ANIMATION_DURATION * 1000);
}

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalQuantity } = useContext(CartContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isAuthenticated } = useAuth();
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
      startAnimation(() => {
        controls.start({ y: 0 }); // Show navbar
      }, "show");
      return;
    }

    if (currentScrollY > lastScrollY) {
      // Scroll down
      startAnimation(() => {
        controls.start({ y: "-100%" }); // Hide navbar
      }, "hide");
    } else {
      // Scroll up
      startAnimation(() => {
        controls.start({ y: 0 }); // Show navbar
      }, "show");
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <motion.div
        animate={controls}
        initial={{ y: 0 }}
        transition={{ duration: ANIMATION_DURATION, ease: "easeOut" }}
        style={{
          height: $Heights.Navbar,
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          top: 0,
        }}
      >
        <Box
          component="nav"
          height={1}
          sx={{
            background:
              "linear-gradient(180deg,rgba(90,191,139,1) 20%,  rgba(24,190,222,1)  100%);",
          }}
        >
          <Container maxWidth="xl" sx={{ height: 1 }}>
            <Grid container alignItems={"center"} sx={{ height: 1 }}>
              {/* Logo Container */}
              <Grid item md={4} lg={2} flexGrow={1}>
                <img
                  src={Logo.src}
                  height={100}
                  alt="Tasheed"
                  // className="hvr-grow-shadow"
                  // style={{ cursor: "pointer" }}
                />
              </Grid>
              {/* NavLinks Container */}
              <Grid
                item
                xs={0}
                md={8}
                lg={7.5}
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                <NavLinks />
              </Grid>
              {/* Contact Us Container */}
              <Grid
                item
                xs={0}
                lg={2.5}
                sx={{
                  display: {
                    xs: "none",
                    lg: "flex",
                  },
                  gap: 2,
                }}
                justifyContent={"end"}
              >
                <Avatar
                  component={ButtonBase}
                  variant="rounded"
                  onClick={() => {}}
                  className="hvr-float-shadow"
                  sx={{
                    bgcolor: pathname == "/favorite" ? "#000" : "#f6f6f6",
                    color: pathname == "/favorite" ? "#fff" : "gray",
                  }}
                >
                  <FavoriteBorderIcon />
                </Avatar>
                <Avatar
                  component={ButtonBase}
                  variant="rounded"
                  className="hvr-float-shadow"
                  sx={{
                    bgcolor: pathname == "/cart" ? "#000" : "#f6f6f6",
                    color: pathname == "/cart" ? "#fff" : "gray",
                  }}
                  onClick={() => {
                    router.push("/cart");
                  }}
                >
                  <Badge badgeContent={totalQuantity} color="warning">
                    <ShoppingCartIcon />
                  </Badge>
                </Avatar>
                {isAuthenticated ? (
                  <UserDropdown />
                ) : (
                  <Tooltip arrow title="Login">
                    <Avatar
                      component={Link}
                      variant="rounded"
                      className="hvr-float-shadow"
                      sx={{
                        bgcolor: pathname == "/auth/login" ? "#000" : "#f6f6f6",
                        color: pathname == "/auth/login" ? "#fff" : "gray",
                      }}
                      href={"/auth/login"}
                    >
                      <LoginIcon />
                    </Avatar>
                  </Tooltip>
                )}
              </Grid>
              {/* Menu Icon Container */}
              <Grid
                item
                sx={{
                  width: "fit-content",
                  display: { md: "none", xs: "block" },
                }}
              >
                <IconButton size="small" onClick={() => setDrawerOpen(true)}>
                  <MenuIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </motion.div>
      <NavDrawer open={drawerOpen} setOpen={setDrawerOpen} />
    </>
  );
}

export default Navbar;
