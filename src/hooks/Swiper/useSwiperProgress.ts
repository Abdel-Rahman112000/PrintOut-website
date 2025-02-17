"use client";

import { useEffect, useState } from "react";
import { Swiper } from "swiper/types";

function useSwiperProgress(swiper: Swiper) {
  const [progress, setProgress] = useState(swiper.progress * 100);

  useEffect(() => {
    const handleSlideChange = () => {
      setProgress(swiper.progress * 100);
    };

    swiper.on("slideChange", handleSlideChange);
    swiper.on("progress", handleSlideChange); // Ensure progress is updated even if not sliding

    return () => {
      swiper.off("slideChange", handleSlideChange);
      swiper.off("progress", handleSlideChange);
    };
  }, [swiper]);

  return progress;
}

export default useSwiperProgress;
