"use client";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./style.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Product } from "@/types/common/Product";

export default function ProductSwiper({ product }: PropsType) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        // navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        style={{ height: "500px", marginBottom: "10px" }}
      >
        <SwiperSlide>
          <img src={product?.media[0]?.original_url} />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)} // onSwiper callback with correct type
        loop={true}
        spaceBetween={20}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        style={{ width: "80%" }}
      >
        {product?.media.length > 1000 &&
          product?.media.map((image) => (
            <SwiperSlide key={image.id}>
              <img src={image.original_url} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

type PropsType = {
  product: Product;
};
