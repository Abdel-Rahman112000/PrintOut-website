"use client";
import "swiper/css";
import "swiper/css/pagination";
// MUI
import { Box, Container, Rating, Stack, Typography } from "@mui/material";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function FeedbackMessages() {
  return (
    <Box pt={10} alignItems={"center"} justifyContent={"center"}>
      <Stack spacing={6}>
        {/* title */}
        <Stack direction={"row"} spacing={4}>
          <Box
            sx={{
              width: "6px",
              height: "30px",
              borderRadius: "10px",
              background:
                "linear-gradient(180deg, rgba(24,190,222,1)  20%,rgba(90,191,139,1)  100%);",
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
          // navigation={true}
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
    </Box>
  );
}

const FeedBackMessage = () => (
  <Box
    p={"20px"}
    m={"5px"}
    minHeight={"200px"}
    borderRadius={"10px"}
    sx={{
      cursor: "pointer",
      background: "linear-gradient(180deg, #18BEDE 0%, #5ABF8B 100%);",
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
        width={65}
        height={65}
      />
      <Rating readOnly name="half-rating" defaultValue={3.5} precision={0.5} />
    </Stack>
    <Typography
      variant="body2"
      sx={{ marginY: 3, fontSize: "22px", fontWeight: 500, color: "#fff" }}
    >
      Floyd Miles
    </Typography>
    <Typography variant="body2" sx={{ marginb: 2, color: "#fff" }}>
      Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
      Velit officia consequat duis enim velit mollit. Exercitation veniam
      consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est
      sit aliqua dolor do amet sint. Velit officia consequat duis enim velit
      mollit. Exercitation veniam consequat sunt nostrud amet.
    </Typography>
  </Box>
);
