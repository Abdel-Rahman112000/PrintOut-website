import Image from "next/image";

import RoundedButton from "@/components/RoundedButton";
import { Stack, Typography } from "@mui/material";

// media
import originalImg from "@/assets/images/originalMode.png";
import blackAndWhiteImg from "@/assets/images/blackandWhite.png";
import verticalImg from "@/assets/images/vertical.png";
import horizentalImg from "@/assets/images/horizental.png";
import { useContext, useState } from "react";
import { Choice } from "@/types/common/Product";
import {
  CustomPrintContext,
  SpecificPageStyle,
} from "@/app/(main-layout)/custom-print-v2/context";

export function BlackAndWhite({
  pageStyle,
}: {
  pageStyle?: SpecificPageStyle;
}) {
  // TODO::declare and define component state and variables
  const {
    handleChangeGlobelFileStyle,
    generalDocSetting,
    handleSetSpecificPageStyle,
  } = useContext(CustomPrintContext);
  let color = pageStyle ? pageStyle?.color : generalDocSetting?.color;

  // TODO::declare and define component helper methods

  // ** return component ui
  return (
    <Stack spacing={3} width={"100%"}>
      <Typography variant="body2" fontSize={12} fontWeight={600}>
        Coloring
      </Typography>
      <Stack
        direction={{
          sx: "column",
          md: "row",
        }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <RoundedButton
          startIcon={
            <Image
              src={blackAndWhiteImg.src}
              width={20}
              height={20}
              alt="original image"
            />
          }
          variant={color == "BlackAndWhite" ? "contained" : "text"}
          fullWidth
          size="large"
          onClick={() => {
            if (pageStyle) {
              handleSetSpecificPageStyle({
                ...pageStyle,
                color: "BlackAndWhite",
              });
            } else if (generalDocSetting) {
              handleChangeGlobelFileStyle({
                ...generalDocSetting,
                color: "BlackAndWhite",
              });
            }
          }}
        >
          Black & White
        </RoundedButton>

        <RoundedButton
          startIcon={
            <Image
              src={originalImg.src}
              width={20}
              height={20}
              alt="original image"
            />
          }
          variant={color == "Colored" ? "contained" : "text"}
          fullWidth
          size="large"
          onClick={() => {
            if (pageStyle) {
              handleSetSpecificPageStyle({
                ...pageStyle,
                color: "Colored",
              });
            } else if (generalDocSetting) {
              handleChangeGlobelFileStyle({
                ...generalDocSetting,
                color: "Colored",
              });
            }
          }}
        >
          Original
        </RoundedButton>
      </Stack>
    </Stack>
  );
}

export function ScallingOption({
  pageStyle,
}: {
  pageStyle?: SpecificPageStyle;
}) {
  // TODO::declare and define component state and variables
  const {
    handleChangeGlobelFileStyle,
    generalDocSetting,
    handleSetSpecificPageStyle,
  } = useContext(CustomPrintContext);
  let scale = pageStyle ? pageStyle?.scale : generalDocSetting?.scale;

  // TODO::declare and define component helper methods
  // ** return component ui
  return (
    <Stack spacing={3} width={"100%"}>
      <Typography variant="body2" fontSize={12} fontWeight={600}>
        Orientation
      </Typography>
      <Stack
        direction={{
          sx: "column",
          md: "row",
        }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <RoundedButton
          startIcon={
            <Image
              src={horizentalImg.src}
              width={15}
              height={15}
              alt="original image"
            />
          }
          variant={scale === "Horizental" ? "contained" : "text"}
          fullWidth
          size="large"
          onClick={() => {
            if (pageStyle) {
              handleSetSpecificPageStyle({
                ...pageStyle,
                scale: "Horizental",
              });
            } else if (generalDocSetting) {
              handleChangeGlobelFileStyle({
                ...generalDocSetting,
                scale: "Horizental",
              });
            }
          }}
        >
          Horizontal
        </RoundedButton>

        <RoundedButton
          startIcon={
            <Image
              src={verticalImg.src}
              width={15}
              height={15}
              alt="original image"
            />
          }
          variant={scale === "Vertical" ? "contained" : "text"}
          fullWidth
          size="large"
          onClick={() => {
            if (pageStyle) {
              handleSetSpecificPageStyle({
                ...pageStyle,
                scale: "Vertical",
              });
            } else if (generalDocSetting) {
              handleChangeGlobelFileStyle({
                ...generalDocSetting,
                scale: "Vertical",
              });
            }
          }}
        >
          Vertical
        </RoundedButton>
      </Stack>
    </Stack>
  );
}

export default function DoubleCustomization(props: PropsType) {
  // TODO::declare and define component state and variables
  const [activeBtn, setActiveBtn] = useState(1);
  const { label, choices, helperText = "", handleChange } = props;

  // TODO::declare and define component helper methods
  // ** return component ui
  return (
    <Stack spacing={3} width={"100%"}>
      <Typography variant="body2" fontSize={12} fontWeight={600}>
        {label}
      </Typography>
      <Stack
        direction={{
          sx: "column",
          md: "row",
        }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {choices?.map((choice) => {
          return (
            <RoundedButton
              key={choice.id}
              variant={activeBtn == choice.id ? "contained" : "text"}
              fullWidth
              size="large"
              onClick={() => {
                handleChange(choice.id.toString());
                setActiveBtn(choice.id);
              }}
            >
              {choice.name}
            </RoundedButton>
          );
        })}
      </Stack>
      <Typography
        variant="body2"
        sx={{
          fontSize: "17.56px",
          fontWeight: 500,
          lineHeight: "21.43px",
          textAlign: "left",
        }}
      >
        {helperText}
      </Typography>
    </Stack>
  );
}

type PropsType = {
  label: string;
  choices: Choice[];
  helperText?: string;
  handleChange: (str: string) => void;
};
