"use client";

import FullSizeImage from "@/components/FullSizeImage";
import { $Heights } from "@/constants/sizes";
import { styled } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { useContext } from "react";
import { HomeContext } from "../../context";

const StyledSwiper = styled(Swiper)(({ theme }) => ({
  height: `calc(100vh - ${$Heights.Navbar}px)`,
}));


function Slider() {
  const { covers } = useContext(HomeContext);

  return (
    <div>
      <StyledSwiper
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        effect="fade"
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
      >
        {Array.isArray(covers) &&
          covers?.map((cover) => (
            <SwiperSlide key={cover.id}>
              <FullSizeImage src={cover?.media?.[0]?.original_url ?? ""} />
            </SwiperSlide>
          ))}
        ...
      </StyledSwiper>
    </div>
  );
}

export default Slider;
