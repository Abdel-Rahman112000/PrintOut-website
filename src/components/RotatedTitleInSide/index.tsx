"use client";

import { Box, Grid, Typography } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";

function RotatedTitleInSide({ children, title }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [minHeight, setMinHeight] = useState(0);
  useEffect(() => {
    if (ref.current) setMinHeight(ref.current.clientWidth + 60);
  }, [ref.current, title]);
  return (
    <div>
      <Grid container spacing={6} sx={{ overflow: "hidden" }}>
        <Grid
          item
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
          xs={0}
          md={2}
          lg={1.75}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Typography
              ref={ref}
              variant="h1"
              textAlign={"end"}
              sx={({ palette }) => ({
                transform: "rotate(270deg) translateY(-100%)",
                transformOrigin: "top right",
                position: "absolute",
                right: 0,
                top: 0,
                WebkitTextFillColor:
                  "transparent" /* Will override color (regardless of order) */,
                WebkitTextStrokeWidth: "2px",
                WebkitTextStrokeColor: palette.text.primary,
                p: 1,
              })}
            >
              {title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={10} lg={10.25} minHeight={minHeight}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
}

type Props = {
  children: ReactNode;
  title: string;
};

export default RotatedTitleInSide;
