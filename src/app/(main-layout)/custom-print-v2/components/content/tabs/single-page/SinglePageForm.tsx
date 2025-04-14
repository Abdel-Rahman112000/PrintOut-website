"use client";

import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useContext, useState } from "react";
import {
  CustomPrintContext,
  SpecificPageStyle,
} from "@/app/(main-layout)/custom-print-v2/context";
import { title } from "process";
import { IconButton, Stack, Typography } from "@mui/material";
import DoubleCustomization, {
  BlackAndWhite,
  ScallingOption,
} from "../DoubleCustomization";

import CloseIcon from "@mui/icons-material/Close";
import MoreCustomization from "../MoreCustomization";
import OneCustomization from "../OneCustomization";

export default function SinglePageForm(props: PropsType) {
  // declare and define component state and variables
  const { pageStyle } = props;
  const {
    PrintProduct,
    handleSetSpecificPageStyle,
    handleRemoveFromSpecificPageStyle,
  } = useContext(CustomPrintContext);
  // customizationChoices

  return (
    <>
      <Stack
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        my={2}
        p={2}
        borderRadius={"12px"}
        border={"1px solid lightgrey"}
      >
        <Stack
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="body2" fontSize={20} fontWeight={800}>
            Custom Style For Page Num# {pageStyle?.pageIndex ?? 0}
          </Typography>
          <IconButton
            onClick={() =>
              handleRemoveFromSpecificPageStyle(pageStyle?.pageIndex ?? -1)
            }
          >
            <CloseIcon color="error" />
          </IconButton>
        </Stack>
        {/* Coloring */}
        {PrintProduct?.color == 1 && <BlackAndWhite pageStyle={pageStyle} />}

        {/* scliing */}
        {PrintProduct?.scaling == 1 && <ScallingOption pageStyle={pageStyle} />}

        {/* Start Set Customization */}
        {PrintProduct?.customizations?.map((customization) => {
          if (customization?.customizations_type === "more")
            return (
              <MoreCustomization
                key={customization.id}
                label={customization.name}
                handleChange={(str) => {
                  let arr = pageStyle?.customizationChoices ?? [];
                  arr.push(+str);
                  handleSetSpecificPageStyle({
                    ...pageStyle,
                    customizationChoices: arr,
                  });
                }}
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
                  let arr = pageStyle?.customizationChoices ?? [];
                  arr.push(+str);
                  handleSetSpecificPageStyle({
                    ...pageStyle,
                    customizationChoices: arr,
                  });
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
      </Stack>
    </>
  );
}

type PropsType = {
  pageStyle: SpecificPageStyle;
};
