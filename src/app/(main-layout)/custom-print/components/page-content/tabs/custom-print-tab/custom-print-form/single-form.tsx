"use client";

import { PaperType } from "@/types/common/Order/Paper";
import { Customization } from "@/types/common/Product";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { CustomPrintFormType } from ".";
import RoundedButton from "@/components/RoundedButton";
import AddLabelToEl from "@/components/AddLabelToEl";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RoundedTextField from "@/components/RoundedTextField";

type Props = {
  selectedForm: number;
  index: number;
  productCustomizations?: Customization[];
  form: UseFormReturn<CustomPrintFormType>;
  papers?: PaperType[];
};

function SingleForm({
  selectedForm,
  index,
  productCustomizations,
  form,
  papers,
}: Props) {
  const {
    control,
    register,
    formState: { errors, isLoading },
    setValue,
    reset,
  } = form;
  return (
    <div style={{ display: selectedForm === index ? "block" : "none" }}>
      <Stack spacing={4}>
        <div>
          <Stack spacing={1}>
            <Controller
              control={control}
              name={`order_details.${index}.paper_id`}
              render={({ field }) => (
                <TextField
                  select
                  label="Paper Size"
                  size="small"
                  value={field.value || null}
                  onChange={(e) => {
                    const value = e.target.value as unknown as number;
                    const currentPaper = papers?.find((x) => x.id === value);
                    if (currentPaper && currentPaper.size) {
                      setValue(
                        `order_details.${index}.bleed`,
                        currentPaper.size.bleed
                      );
                      setValue(
                        `order_details.${index}.width`,
                        currentPaper.size.width
                      );
                      setValue(
                        `order_details.${index}.height`,
                        currentPaper.size.height
                      );
                    }

                    field.onChange(value);
                  }}
                >
                  {papers?.map((paper) => (
                    <MenuItem key={paper.id} value={paper.id}>
                      {paper.name} (H:{paper.size?.height}mm, W:
                      {paper.size?.width}mm, B:{paper.size?.bleed}mm)
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <div>
              <Stack spacing={1} px={4}>
                <Controller
                  control={control}
                  name={`order_details.${index}.height`}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Height
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">mm</InputAdornment>
                        ),
                      }}
                      variant="standard"
                      size="small"
                      type="number"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`order_details.${index}.width`}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Width
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">mm</InputAdornment>
                        ),
                      }}
                      variant="standard"
                      size="small"
                      type="number"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`order_details.${index}.bleed`}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Bleed
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">mm</InputAdornment>
                        ),
                      }}
                      variant="standard"
                      size="small"
                      type="number"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />
              </Stack>
            </div>
          </Stack>
        </div>

        {productCustomizations?.map(
          ({ id, choices, name, customizations_type }, customizationIndex) => (
            <Controller
              key={id}
              control={control}
              name={`order_details.${index}.Customizations.${customizationIndex}`}
              render={({ field, fieldState }) => {
                if (customizations_type === "double") {
                  return (
                    <div>
                      <Grid container spacing={2}>
                        {choices?.map((choice) => (
                          <Grid item key={choice.id} xs={6}>
                            <RoundedButton
                              color={
                                Boolean(fieldState.error) ? "error" : "primary"
                              }
                              fullWidth
                              variant={
                                field.value == choice.id ? "contained" : "text"
                              }
                              onClick={() => {
                                field.onChange(choice.id);
                              }}
                            >
                              {choice.name}
                            </RoundedButton>
                          </Grid>
                        ))}
                      </Grid>
                      <Typography variant="caption" color="error">
                        {fieldState.error?.message}
                      </Typography>
                    </div>
                  );
                }
                return (
                  <RoundedTextField
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    select
                    label={name}
                    fullWidth
                  >
                    {choices?.map((choice) => (
                      <MenuItem key={choice.id} value={choice.id}>
                        {choice.name}
                      </MenuItem>
                    ))}
                  </RoundedTextField>
                );
              }}
            />
          )
        )}
        <Box component={Paper} p={2} elevation={5}>
          <AddLabelToEl
            label="Quantity"
            labelTypographyProps={{
              variant: "body2",
              fontWeight: 700,
            }}
          >
            <Stack direction="row" alignItems="center">
              <Controller
                control={control}
                name={`order_details.${index}.qty`}
                render={({ field }) => (
                  <Box sx={{}}>
                    <IconButton
                      onClick={() => field.onChange(Number(field.value) - 1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <InputBase
                      type="number"
                      sx={{
                        width: "75px",
                        textAlign: "center",
                        minWidth: "none",
                      }}
                      {...field}
                    />
                    <IconButton
                      onClick={() => field.onChange(Number(field.value) + 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                )}
              />
            </Stack>
          </AddLabelToEl>
        </Box>
      </Stack>
    </div>
  );
}

export default SingleForm;
