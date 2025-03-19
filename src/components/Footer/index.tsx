"use client";

import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CinzelAddLabelToEl from "../AddLabelToEl/CinzelAddLabelToEl";
import { ReactNode } from "react";
import FooterMenuList from "./FooterMenuList";
import Logo from "@/assets/images/printout-logo-white.png";

// Images
import GooglePlay from "@/assets/images/google-play-icon.png";
import mobileApp from "@/assets/images/mobileApp.png";

// Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Location, MoreInfo, Services } from "./dumyData";

export const SectionItem = ({ label, children }: SectionItemProps) => (
  <CinzelAddLabelToEl
    labelTypographyProps={{ variant: "h6", fontWeight: 400, mb: 3 }}
    label={label}
  >
    {children}
  </CinzelAddLabelToEl>
);

export type SectionItemProps = {
  children: ReactNode;
  label: string;
};

function Footer() {
  return (
    <Box
      component="footer"
      mt={10}
      sx={{
        background:
          "linear-gradient(180deg, rgba(24,190,222,1)  20%,rgba(90,191,139,1)  100%);",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* pages links */}
        <Grid spacing={2} container mb={5}>
          <Grid item xs={12} md={3}>
            <img
              src={Logo.src}
              height={200}
              alt="printout logo"
              // className="hvr-grow-shadow"
              // style={{ cursor: "pointer" }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FooterMenuList items={Services} />
          </Grid>
          <Grid item xs={12} md={3}>
            <FooterMenuList items={MoreInfo} />
          </Grid>
          <Grid item xs={12} md={3}>
            <FooterMenuList items={Location} />
          </Grid>
        </Grid>
        {/* social links & mobile app link */}
        <Grid spacing={2} rowSpacing={12} container mb={5}>
          {/* <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <IconButton>
                <FacebookIcon sx={{ color: "#F6F6F6" }} />
              </IconButton>
              <IconButton>
                <InstagramIcon sx={{ color: "#F6F6F6" }} />
              </IconButton>
              <IconButton>
                <TwitterIcon sx={{ color: "#F6F6F6" }} />
              </IconButton>
              <IconButton>
                <LinkedInIcon sx={{ color: "#F6F6F6" }} />
              </IconButton>
            </Stack>
          </Grid> */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              fontSize={25}
              fontWeight={700}
              color={"#fff"}
              mb={5}
            >
              Download The App
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={4}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                sx={{
                  px: 2,
                  py: 1,
                  backgroundColor: "#404040",
                  borderRadius: 2,
                }}
              >
                <img
                  src={GooglePlay.src}
                  width={30}
                  height={30}
                  alt="google play"
                />
                <Box>
                  <Typography variant="body2" color={"#fff"}>
                    android app on
                  </Typography>
                  <Typography variant="body1" color={"#fff"} fontSize={18}>
                    Google Play
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                sx={{
                  px: 2,
                  py: 1,
                  backgroundColor: "#404040",
                  borderRadius: 2,
                }}
              >
                <img
                  src={mobileApp.src}
                  width={20}
                  height={30}
                  alt="mobile app"
                />
                <Box>
                  <Typography variant="body2" color={"#fff"}>
                    Available on the
                  </Typography>
                  <Typography variant="body1" color={"#fff"} fontSize={18}>
                    App Store
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          py: 3,
          backgroundColor: "#404040",
        }}
      >
        <Typography
          variant="body2"
          textAlign={"center"}
          fontSize={16}
          fontWeight={700}
          color={"#fff"}
        >
          Copyright © 2024 MKMO. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
