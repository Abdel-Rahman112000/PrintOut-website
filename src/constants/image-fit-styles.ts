import { HTMLAttributes } from "react";

export const IMAGE_FIT_STYLES: HTMLAttributes<HTMLImageElement>["style"] = {
  objectFit: "cover",
  width: "100%",
  height: "100%",
  transition: "all 0.5s ease-in-out",
  
};
