"use client";
import "swiper/css";
import "swiper/css/pagination";
// MUI
import { Box, Rating, Stack, Typography } from "@mui/material";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";

export default function FeedbackMessages() {
  return (
    <Stack my={6} alignItems={"center"} justifyContent={"center"}>
      <Stack
        spacing={6}
        width={{
          xs: "100%",
          md: "90%",
        }}
      >
        {/* title */}
        <Stack direction={"row"} spacing={4}>
          <Box
            sx={{
              width: "6px",
              height: "30px",
              borderRadius: "10px",
              background: "#8A33FD",
            }}
          ></Box>
          <Typography variant="h5" fontWeight={800} fontSize={26}>
            Feedback
          </Typography>
        </Stack>
        {/* messages */}
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          centeredSlides={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper mt-5"
          loop
        >
          <SwiperSlide>
            <FeedBackMessage />
          </SwiperSlide>
          <SwiperSlide>
            <FeedBackMessage />
          </SwiperSlide>
          <SwiperSlide>
            <FeedBackMessage />
          </SwiperSlide>
          <SwiperSlide>
            <FeedBackMessage />
          </SwiperSlide>
          <SwiperSlide>
            <FeedBackMessage />
          </SwiperSlide>
        </Swiper>
      </Stack>
    </Stack>
  );
}

const FeedBackMessage = () => (
  <Box
    p={"20px"}
    m={"5px"}
    minHeight={"200px"}
    borderRadius={"10px"}
    border={"1.8px solid"}
    sx={{
      cursor: "pointer",
    }}
  >
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <img
        src="https://images.unsplash.com/photo-1514906594387-3f184d228478?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="user"
        width={58}
        height={58}
      />
      <Rating readOnly name="half-rating" defaultValue={2.5} precision={0.5} />
    </Stack>
    <Typography
      variant="body2"
      my={2}
      fontWeight={500}
      fontSize={18}
      color={"#000"}
    >
      Floyd Miles
    </Typography>
    <Typography variant="body2">
      Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
      Velit officia consequat duis enim velit mollit. Exercitation veniam
      consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est
      sit aliqua dolor do amet sint. Velit officia consequat duis enim velit
      mollit. Exercitation veniam consequat sunt nostrud amet.
    </Typography>
  </Box>
);
