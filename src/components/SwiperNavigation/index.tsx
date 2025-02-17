"use client";

import { Box, Container, LinearProgress, Stack } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CircularButton from "@/components/CircularButton";
import DarkCircularButton from "@/components/CircularButton/variants/Dark";
import { useSwiper } from "swiper/react";
import { useEffect, useState } from "react";
import useSwiperProgress from "@/hooks/Swiper/useSwiperProgress";

function SwiperNavigation() {
  const swiper = useSwiper();

  const progress = useSwiperProgress(swiper);

  return (
    <Container maxWidth={"xl"}>
      <Stack direction={"row"} spacing={2} py={6} alignItems={"center"}>
        <Box flexGrow={1}>
          <Box width={0.4}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 16,
                borderRadius: 6,
                ".MuiLinearProgress-bar": {
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        </Box>
        <Stack direction="row" spacing={2}>
          <DarkCircularButton onClick={() => swiper.slidePrev()}>
            <ChevronLeftIcon />
          </DarkCircularButton>
          <DarkCircularButton onClick={() => swiper.slideNext()}>
            <ChevronRightIcon />
          </DarkCircularButton>
        </Stack>
      </Stack>
    </Container>
  );
}

export default SwiperNavigation;
