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
    zoomLevel,
    orderDataNew,
    zoomLevelSinglePage,
    settingMode
     // Access zoomLevel from context
  } = useContext(CustomPrintContext);
  console.log("orderData", orderData);
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
        <> 
          {settingMode === "AllPages" ?   
          orderData?.pictures?.map((image, idx) => {
            let _customStyle = pagesCustomizations?.find(
              (ele) => ele.pageIndex === idx
            );
            let isBlackAndWhite = _customStyle
              ? _customStyle.color == "BlackAndWhite"
              : generalDocSetting?.color === "BlackAndWhite";
            let isHorizential = _customStyle
              ? _customStyle.scale == "Horizental"
              : generalDocSetting?.scale === "Horizental";
            let orignalHeight = selectedPage?.size?.width
              ? image.custom_properties.height /
                (selectedPage?.size?.height / 565)
              : 0;
            let orignalWidth = selectedPage?.size?.width
              ? image.custom_properties.width /
                (selectedPage?.size?.width / 400)
              : 0;
            let isLandscape = orignalWidth > orignalHeight;
            let isPortrait = orignalHeight > orignalWidth;
            let isSquare = orignalHeight === orignalWidth;

            let removedWidth = generalDocSetting?.width
              ? (selectedPage?.size?.width ?? 0) - generalDocSetting?.width
              : 0;
            console.log(orignalHeight, orignalWidth);
            return (
              <Stack
                key={image.id}
                width={"100%"}
                height={"565px"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Stack
                  sx={{
                    width: "400px",
                    height: "565px",
                    bgcolor: "#737373",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={image?.original_url ?? ""}
                    alt={`image num ${idx}`}
                    style={{
                      height: `${orignalHeight}px`,
                      width: `${orignalWidth}px`,
                      filter: isBlackAndWhite
                        ? `grayscale(100%) contrast(200%)`
                        : "",
                      transform: `scale(${zoomLevel}) ${
                        isHorizential ? "rotate(90deg)" : ""
                      }`, // Apply zoomLevel and rotation dynamically
                      transition: `all 0.3s`,
                    }}
                  />
                </Stack>
              </Stack>
            );
          }) :  orderDataNew?.pictures?.map((image, idx) => {
            let _customStyle = pagesCustomizations?.find(
              (ele) => ele.pageIndex === idx
            );
            let isBlackAndWhite = _customStyle
              ? _customStyle.color == "BlackAndWhite"
              : generalDocSetting?.color === "BlackAndWhite";
            let isHorizential = _customStyle
              ? _customStyle.scale == "Horizental"
              : generalDocSetting?.scale === "Horizental";
            let orignalHeight = selectedPage?.size?.width
              ? image.custom_properties.height /
                (selectedPage?.size?.height / 565)
              : 0;
            let orignalWidth = selectedPage?.size?.width
              ? image.custom_properties.width /
                (selectedPage?.size?.width / 400)
              : 0;
            let isLandscape = orignalWidth > orignalHeight;
            let isPortrait = orignalHeight > orignalWidth;
            let isSquare = orignalHeight === orignalWidth;

            let removedWidth = generalDocSetting?.width
              ? (selectedPage?.size?.width ?? 0) - generalDocSetting?.width
              : 0;
            console.log(orignalHeight, orignalWidth);
            return (
              <Stack
                key={image.id}
                width={"100%"}
                height={"565px"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Stack
                  sx={{
                    width: "400px",
                    height: "565px",
                    bgcolor: "#737373",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={image?.original_url ?? ""}
                    alt={`image num ${idx}`}
                    style={{
                      height: `${orignalHeight}px`,
                      width: `${orignalWidth}px`,
                      filter: isBlackAndWhite
                        ? `grayscale(100%) contrast(200%)`
                        : "",
                      transform: `scale(${zoomLevelSinglePage}) ${
                        isHorizential ? "rotate(90deg)" : ""
                      }`, // Apply zoomLevel and rotation dynamically
                      transition: `all 0.3s`,
                    }}
                  />
                </Stack>
              </Stack>
            );
          })
        
          }
        </>
      )}
    </Stack>
  );
}
