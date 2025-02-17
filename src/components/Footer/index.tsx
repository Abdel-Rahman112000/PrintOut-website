"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Grid,
  GridProps,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CinzelAddLabelToEl from "../AddLabelToEl/CinzelAddLabelToEl";
import { ReactNode } from "react";
import FooterMenuList from "./FooterMenuList";

// Images
import GooglePlay from "@/assets/images/google-play-icon.png";
import mobileApp from "@/assets/images/mobileApp.png";

// Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const SectionItem = ({ label, children }: SectionItemProps) => (
  <CinzelAddLabelToEl
    labelTypographyProps={{ variant: "h6", fontWeight: 400, mb: 3 }}
    label={label}
  >
    {children}
  </CinzelAddLabelToEl>
);

const GridItem = (props: GridProps) => (
  <Grid item xs={12} md={6} lg={4} {...props} />
);
export type SectionItemProps = {
  children: ReactNode;
  label: string;
};

function Footer() {
  return (
    <Box component="footer" mt={6} py={12} sx={{ bgcolor: "#3C4242" }}>
      <Container maxWidth="xl">
        {/* pages links */}
        <Grid spacing={2} rowSpacing={12} container>
          <Grid item xs={12} md={3}>
            <FooterMenuList />
          </Grid>
          <Grid item xs={12} md={3}>
            <FooterMenuList />
          </Grid>
          <Grid item xs={12} md={3}>
            <FooterMenuList />
          </Grid>
          <Grid item xs={12} md={3}>
            <FooterMenuList />
          </Grid>
        </Grid>
        {/* social links & mobile app link */}
        <Grid spacing={2} rowSpacing={12} container>
          <Grid
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              fontSize={25}
              fontWeight={700}
              color={"#fff"}
            >
              Download The App
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={4}>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
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

              <Stack direction={"row"} alignItems={"center"} spacing={2}>
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
          <Grid item xs={12}>
            <Typography
              variant="body2"
              textAlign={"center"}
              fontSize={20}
              fontWeight={700}
              color={"#fff"}
            >
              Copyright © 2024 MKMO. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
