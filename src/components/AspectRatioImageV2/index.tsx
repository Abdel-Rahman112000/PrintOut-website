import { Typography } from "@mui/material";
import { ImgHTMLAttributes } from "react";
import AspectRatio from "../AspectRatio";

function AspectRatioImageV2({
  overlay,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { overlay?: string }) {
  return (
    <AspectRatio ratio={1}>
      <img
        alt="Aspect Ratio"
        {...props}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          ...props.style,
        }}
      />
      {typeof overlay === "string" && (
        <Typography
          sx={{
            width: 1,
            height: 1,
            background: "#00000099",
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pointerEvents: "none",
          }}
          variant="h4"
          fontWeight={700}
          color={"text.primary"}
        >
          {overlay}
        </Typography>
      )}
    </AspectRatio>
  );
}

export default AspectRatioImageV2;
