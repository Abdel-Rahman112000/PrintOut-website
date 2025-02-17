import { useState, useEffect } from "react";

export const useResponsiveSpaceBetween = () => {
  const [spaceBetween, setSpaceBetween] = useState(175);

  useEffect(() => {
    const updateSpaceBetween = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 2440) {
        setSpaceBetween(325);
      } else if (screenWidth >= 1920) {
        setSpaceBetween(250);
      } else if (screenWidth >= 1280) {
        setSpaceBetween(175);
      } else if (screenWidth >= 768) {
        setSpaceBetween(50);
      } else {
        setSpaceBetween(25);
      }
    };

    updateSpaceBetween();
    window.addEventListener("resize", updateSpaceBetween);

    return () => {
      window.removeEventListener("resize", updateSpaceBetween);
    };
  }, []);

  return spaceBetween;
};
