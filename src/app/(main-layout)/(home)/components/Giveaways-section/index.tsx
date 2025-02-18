"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { HomeContext } from "../../context";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Keyboard, Pagination, Navigation, Autoplay } from "swiper/modules";
import { ProductCard } from "./ProductCard";
export default function GiveawaysProduct() {
  const { productsRegularGiveaway } = useContext(HomeContext);
  if (
    Array.isArray(productsRegularGiveaway) &&
    productsRegularGiveaway.length == 0
  )
    return <></>;
  return (
    <Container>
      <Stack my={6} alignItems={"start"} justifyContent={"center"}>
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
            Giveaways Products
          </Typography>
        </Stack>
        {/* product row */}
      </Stack>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        centeredSlides={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        keyboard={{
          enabled: true,
        }}
        modules={[Keyboard, Pagination, Navigation, Autoplay]}
        className="mySwiper mt-5"
        loop
      >
        {Array.isArray(productsRegularGiveaway) &&
          productsRegularGiveaway?.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard key={product.id} product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Container>
  );
}
