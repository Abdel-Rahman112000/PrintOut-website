"use client";
// MUI
import { IconButton, Stack, Typography } from "@mui/material";

// Icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";

export default function PageDimension(props: PropsType) {
  // ** declare and define component state and variables
  const { title, value, handleChange } = props;
  const [dimentionVal, setDimentionVal] = useState(value);

  useEffect(() => {
    setDimentionVal(value);
  }, [value]);

  useEffect(() => {
    handleChange(dimentionVal);
  }, [dimentionVal]);

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
    >
      <Typography variant="body2" fontSize={18} fontWeight={700}>
        {title}
      </Typography>
      <Stack
        alignItems={"center"}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <IconButton
          disabled={dimentionVal <= 0}
          onClick={() =>
            setDimentionVal((prev) => {
              if (prev > 0) return prev - 1;
              return prev;
            })
          }
        >
          <RemoveIcon />
        </IconButton>
        <Typography
          variant="body2"
          fontSize={18}
          fontWeight={700}
          color={"primary.main"}
        >
          {dimentionVal} mm
        </Typography>
        <IconButton
          disabled={dimentionVal >= value}
          onClick={() =>
            setDimentionVal((prev) => {
              if (prev < value) return prev + 1;
              return prev;
            })
          }
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

type PropsType = {
  title: string;
  value: number;
  handleChange(val: number): void;
};
