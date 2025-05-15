"use client";
import { CustomPrintContext } from "@/app/(main-layout)/custom-print-v2/context";
import {
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Slider,
} from "@mui/material";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import PageDimension from "./PageDimension";
import DoubleCustomization, {
  BlackAndWhite,
  ScallingOption,
} from "../DoubleCustomization";
import MoreCustomization from "../MoreCustomization";
import OneCustomization from "../OneCustomization";

export default function AllPagesSettings() {
  // TODO:: declare and define component state and variables
  const { control } = useForm();
  const {
    papers,
    selectedPage,
    PrintProduct,
    handleStoreNote,
    handleStoreSelectedPage,
    handleChangeGlobelFileStyle,
    generalDocSetting,
    zoomLevel,
    handleSetZoomLevel,
  } = useContext(CustomPrintContext);

  // TODO:: declare and define component helper methods
  function handleChange(id: number) {
    let _page = papers?.size?.find((paper) => paper.id === id);
    handleStoreSelectedPage(_page);
  }
  console.log("selectedPage",selectedPage)

  return (
    <Stack my={2} alignItems={"center"}>
      <Stack
        spacing={4}
        alignItems={"center"}
        width={{
          xs: "98%",
          md: "70%",
        }}
      >
        {!!Boolean(PrintProduct) && (
          <Typography
            variant="body2"
            color={"primary.main"}
            fontSize={22}
            fontWeight={700}
          >
            Select Print Product Type Firstly
          </Typography>
        )}
        {/* select paper size */}
        {!Boolean(PrintProduct) && (
          <Controller
            control={control}
            name={`order_details.${1}.paper_id`}
            render={({ field }) => (
              <TextField
                select
                label="Paper Size"
                size="small"
                value={field.value || null}
                onChange={(e) => {
                  const value = e.target.value as unknown as number;
                  handleChange(value);
                  field.onChange(value);
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    width: {
                      xs: "380.24px",
                      md: "550.24px",
                    },
                    height: "52.31px",
                    borderRadius: "30px",
                    border: "1.17px",
                  },
                }}
              >
                {papers?.size &&
                  Array.isArray(papers?.size) &&
                  papers?.size?.map((paper) => (
                    <MenuItem key={paper.id} value={paper.id}>
                      {paper.name} (H:{paper.size?.height}mm, W:
                      {paper.size?.width}mm, B:{paper.size?.bleed}mm)
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
        )}

        {/* paper dimensions */}
        {selectedPage && Boolean(selectedPage) && (
          <>
            <PageDimension
              title="Height"
              value={selectedPage?.size?.height ?? 0}
              handleChange={(val) => {
                if (generalDocSetting) {
                  handleChangeGlobelFileStyle({
                    ...generalDocSetting,
                    height: val,
                  });
                }
              }}
            />
            <PageDimension
              title="Width"
              value={selectedPage?.size?.width ?? 0}
              handleChange={(val) => {
                if (generalDocSetting) {
                  handleChangeGlobelFileStyle({
                    ...generalDocSetting,
                    width: val,
                  });
                }
              }}
            />
            <PageDimension
              title="Bleed"
              value={selectedPage?.size?.bleed ?? 0}
              handleChange={(val) => {
                if (generalDocSetting) {
                  handleChangeGlobelFileStyle({
                    ...generalDocSetting,
                    bleed: val,
                  });
                }
              }}
            />
          </>
        )}

        {/* Coloring */}
        {/* {PrintProduct?.color == 1 && <BlackAndWhite />} */}
        <BlackAndWhite />

        {/* scliing */}
        {/* {PrintProduct?.scaling == 1 && <ScallingOption />} */}
        <ScallingOption />

        {/* Start Set Customization */}
        {PrintProduct?.customizations?.map((customization) => {
          if (customization?.customizations_type === "more")
            return (
              <MoreCustomization
                key={customization.id}
                label={customization.name}
                handleChange={(str) => {}}
                choices={customization?.choices ?? []}
              />
            );

          if (customization?.customizations_type === "double")
            return (
              <DoubleCustomization
                key={customization.id}
                label={customization?.name}
                choices={customization?.choices ?? []}
                handleChange={(str) => {
                  if (generalDocSetting) {
                    let arr = generalDocSetting?.customizationChoices ?? [];
                    if (arr.indexOf(+str) == -1) arr.push(+str);
                    handleChangeGlobelFileStyle({
                      ...generalDocSetting,
                      customizationChoices: arr,
                    });
                  }
                }}
              />
            );

          return (
            <OneCustomization
              key={customization?.id}
              label={customization?.name ?? ""}
            />
          );
        })}

        <Stack >
          <Typography variant="body2" fontWeight={600}>
            Zoom Level: {zoomLevel.toFixed(2)}
          </Typography>
          <Slider
            value={zoomLevel}
            min={0.5}
            max={2}
            step={0.01}
            onChange={(e, value) => handleSetZoomLevel(value as number)}
            sx={{
              width: "80%",
              mt: 2,
            }}
          />
        </Stack>

        {!Boolean(PrintProduct) && (
          <TextField
            multiline
            minRows={3}
            label="Add quick note"
            sx={{ my: 4, width: "100%" }}
            onChange={(e) => {
              handleStoreNote(e.target.value);
            }}
          />
        )}
      </Stack>
    </Stack>
  );
}
