// import { Stack } from "@mui/material";
// import PrintTypeFilters from "../print-type-filters/printTypeFilters";
// import PrintFiltersContent from "../content";
// import FileImagesPreview from "../images-preview";

// export default function CustomPrintEntryPoint() {
//   return (
//     <Stack
//       direction={{ xs: "column", md: "row" }}
//       alignItems={{
//         xs: "center",
//         md: "start",
//       }}
//       justifyContent={{
//         xs: "center",
//         md: "space-around",
//       }}
//     >
//       {/* print type filters */}
//       {/* <PrintTypeFilters /> */}
//       {/* content */}
//       {/* <PrintFiltersContent /> */}
//       {/* preview */}
//       {/* <FileImagesPreview /> */}
//     </Stack>
//   );
// }
"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import { Stage, Layer, Image } from "react-konva";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { CustomPrintContext } from "../../context";

const CustomPrintEntryPoint = () => {
  const [image, setImage] = useState(null);
  const [imageType, setImageType] = useState("");
  const [bwMode, setBwMode] = useState(false);
  const [orientation, setOrientation] = useState("horizontal");
  const [paperType, setPaperType] = useState("Glossy");
  const [finishing, setFinishing] = useState("None");
  const [imageSize, setImageSize] = useState({ width: 210, height: 297 });
  const {
    orderData,
    orderLoading,
    generalDocSetting,
    pagesCustomizations,
    selectedPage,
  } = useContext(CustomPrintContext);

  const uploadedImage = orderData?.media?.[0]?.original_url ?? "";

  useEffect(() => {
    if (!uploadedImage) return;

    const img = new window.Image();
    img.src = uploadedImage;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      setImage(img);
      const type = uploadedImage.split(".").pop().toUpperCase();
      setImageType(type);
    };
  }, [uploadedImage]); // Depend on uploadedImage
  // Black & White Filter
  const applyBWFilter = () => {
    if (image) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Failed to get canvas rendering context.");
        return;
      }

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg;
      }

      ctx.putImageData(imageData, 0, 0);
      const newImg = new window.Image();
      newImg.src = canvas.toDataURL();
      newImg.onload = () => setImage(newImg);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <Typography variant="subtitle1" gutterBottom>
        Image Type: {imageType || "Loading..."}
      </Typography>

      {/* Image Canvas */}
      <Box border={1} p={2} display="flex" justifyContent="center">
        <Stage width={imageSize.width} height={imageSize.height}>
          <Layer>
            {image && (
              <Image
                image={image}
                ref={imageRef}
                width={imageSize.width}
                height={imageSize.height}
                draggable
              />
            )}
          </Layer>
        </Stage>
      </Box>

      {/* Controls */}
      <Box mt={4} display="flex" flexDirection="column" gap={2} width="250px">
        {/* Width & Height Inputs */}
        <Box display="flex" gap={2}>
          <TextField
            label="Width (mm)"
            type="number"
            fullWidth
            value={imageSize.width}
            onChange={(e) =>
              setImageSize({ ...imageSize, width: parseInt(e.target.value) })
            }
          />
          <TextField
            label="Height (mm)"
            type="number"
            fullWidth
            value={imageSize.height}
            onChange={(e) =>
              setImageSize({ ...imageSize, height: parseInt(e.target.value) })
            }
          />
        </Box>

        {/* Paper Type Selection */}
        <Select
          fullWidth
          value={paperType}
          onChange={(e) => setPaperType(e.target.value)}
        >
          <MenuItem value="Glossy">Glossy</MenuItem>
          <MenuItem value="Matte">Matte</MenuItem>
          <MenuItem value="Textured">Textured</MenuItem>
        </Select>

        {/* Finishing Option */}
        <Select
          fullWidth
          value={finishing}
          onChange={(e) => setFinishing(e.target.value)}
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Laminated">Laminated</MenuItem>
          <MenuItem value="UV Coating">UV Coating</MenuItem>
        </Select>

        {/* Buttons */}
        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={() => setBwMode(!bwMode)}>
            {bwMode ? "Color" : "Black & White"}
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              setOrientation(
                orientation === "horizontal" ? "vertical" : "horizontal"
              )
            }
          >
            {orientation === "horizontal" ? "Vertical" : "Horizontal"}
          </Button>
        </Box>

        {bwMode && (
          <Button variant="contained" color="secondary" onClick={applyBWFilter}>
            Apply BW Filter
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CustomPrintEntryPoint;
