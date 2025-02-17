import { Stack } from "@mui/material";
import { ReactNode } from "react";
import RenderMedia, { WithMediaProps } from "../RenderMedia";

function IntroImageSection({ media, children }: Props) {
  return (
    <Stack
      sx={{
        position: "relative",
        zIndex: 100,
        width: 1,
        height: { xs: 600, lg: "80vh" },
      }}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={12}
      bgcolor={"background.default"}
    >
      <div
        style={{
          opacity: 0.4,
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      >
        <RenderMedia media={media} />
      </div>
      <Stack
        width={{ xs: 1, md: 0.8, lg: 0.7, xl: 0.6 }}
        sx={{ zIndex: 10 }}
        spacing={4}
      >
        {children}
      </Stack>
    </Stack>
  );
}

type Props = {
  children: ReactNode;
} & WithMediaProps;

export default IntroImageSection;
