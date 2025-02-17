"use client";

import { Box, Grid } from "@mui/material";
import { ReactNode, useMemo, useState } from "react";
import FsLightbox from "fslightbox-react";
import AspectRatioImageV2 from "../AspectRatioImageV2";

function GridImagesViewer({ images, limitRows = 2, columns = 2 }: PropsType) {
  const imagesToShow: GridImageItem[] = images.slice(0, limitRows * columns);
  const [toggler, setToggler] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const openImage = (index: number) => {
    setCurrentImageIndex(index);
    setToggler(!toggler);
  };
  const exceeded = useMemo(
    () => images.length - imagesToShow.length,
    [images.length]
  );

  return (
    <>
      <Grid container spacing={1}>
        {imagesToShow.map((img, index) => {
          const Image = (
            <AspectRatioImageV2
              src={img.src}
              onClick={() => openImage(index)}
              style={{ cursor: "pointer" }}
              {...(index === imagesToShow.length - 1 && exceeded > 1
                ? { overlay: `+${exceeded}` }
                : undefined)}
            />
          );
          return (
            <Grid
              key={img.src}
              item
              xs={12 / columns}
              sx={{ position: "relative" }}
            >
              {img.wrapper ? <img.wrapper>{Image}</img.wrapper> : Image}
            </Grid>
          );
        })}
      </Grid>

      <FsLightbox
        toggler={toggler}
        sources={images.map((img) => (
          <img
            key={img.src}
            alt="toggler"
            style={{ height: "90vh" }}
            src={img.src}
          />
        ))}
        sourceIndex={currentImageIndex}
      />
    </>
  );
}

type PropsType = {
  images: GridImageItem[];
  limitRows?: number;
  columns?: number;
};

export type GridImageItem = {
  src: string;
  wrapper?: (x: { children: ReactNode }) => ReactNode;
};

export default GridImagesViewer;
