"use client";

import { Box, Skeleton, Stack } from "@mui/material";
import { useContext } from "react";
import { CustomPrintContext } from "../../context";

export default function FileImagesPreview() {
  const {
    orderData,
    orderLoading,
    generalDocSetting,
    pagesCustomizations,
    selectedPage,
  } = useContext(CustomPrintContext);

  return (
    <Stack
      spacing={3}
      alignItems={"center"}
      justifyContent={"start"}
      sx={{
        width: "477px",
        height: "736px",
        overflowY: "auto",
        py: "2rem",
      }}
    >
      {orderLoading ? (
        <Skeleton
          width={"350px"}
          height="500px"
          sx={{ borderRadius: "15px" }}
        />
      ) : (
        orderData?.media?.map((image, idx) => {
          let _customStyle = pagesCustomizations?.find(
            (ele) => ele.pageIndex === idx
          );
          let isBlackAndWhite = _customStyle
            ? _customStyle.color == "BlackAndWhite"
            : generalDocSetting?.color === "BlackAndWhite";
          let isHorizential = _customStyle
            ? _customStyle.scale == "Horizental"
            : generalDocSetting?.scale === "Horizental";
          let removedHeight = generalDocSetting?.height
            ? (selectedPage?.size?.height ?? 0) - generalDocSetting?.height
            : 0;
          let removedWidth = generalDocSetting?.width
            ? (selectedPage?.size?.width ?? 0) - generalDocSetting?.width
            : 0;
          console.log("generalDocSettinggeneralDocSetting", generalDocSetting);

          return (
            <Stack
              key={image.id}
              width={"100%"}
              height={"500px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Stack
                sx={{
                  width: "400px",
                  height: "450px",
                  my: 2,
                  bgcolor: "#737373",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={image?.original_url ?? ""}
                  alt={`image num ${idx}`}
                  style={{
                    height: image?.original_url.endsWith(".pdf")
                      ? 50
                      : 400 - removedHeight,
                    width: image?.original_url.endsWith(".pdf")
                      ? 50
                      : 350 - removedWidth,
                    filter: isBlackAndWhite
                      ? `grayscale(100%) contrast(200%)`
                      : "",
                    transform: isHorizential ? "rotate(90deg)" : "",
                    // size: 'landscape',
                    transition: `all 0.3s`,
                  }}
                />
              </Stack>
            </Stack>
          );
        })
      )}
    </Stack>
  );
}
