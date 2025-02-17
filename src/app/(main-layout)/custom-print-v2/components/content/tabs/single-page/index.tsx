"use client";
import { useContext, useState } from "react";
import SinglePageForm from "./SinglePageForm";
import { CustomPrintContext } from "@/app/(main-layout)/custom-print-v2/context";
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import RoundedButton from "@/components/RoundedButton";

// MUI Icons
import AddIcon from "@mui/icons-material/Add";

export default function SinglePageSettings() {
  // TODO::declare and define component state and variables
  const [pageIdx, setPageIdx] = useState<number | undefined>();
  const {
    orderData,
    PrintProduct,
    pagesCustomizations,
    handleSetSpecificPageStyle,
  } = useContext(CustomPrintContext);
  let options = orderData?.media
    ?.map((ele, index) => ({
      title: index + 1,
      value: index + 1,
    }))
    .filter((ele) => {
      if (pagesCustomizations.find((item) => item.pageIndex == ele.value))
        return false;
      return true;
    });

  // TODO::declare and define component methods
  const handleClick = () => {
    handleSetSpecificPageStyle({
      pageIndex: pageIdx,
      color: undefined,
      scale: undefined,
      mode: undefined,
    });
    setPageIdx(undefined);
  };

  // ** return our ui
  return (
    <>
      {!Boolean(PrintProduct) ? (
        <Typography
          variant="body2"
          color={"primary.main"}
          fontSize={22}
          fontWeight={700}
        >
          Select Print Product Type Firstly
        </Typography>
      ) : (
        <>
          <Typography variant="body1" fontSize={22} fontWeight={700} my={3}>
            Add Custom Style For Specific Pages
          </Typography>
          {pagesCustomizations?.map((pageStyle) => (
            <SinglePageForm key={pageStyle.pageIndex} pageStyle={pageStyle} />
          ))}
          <Stack direction={"row"} spacing={4}>
            <Autocomplete
              id="fixed-tags-demo"
              onChange={(event, newValue) => {
                setPageIdx(newValue?.value);
              }}
              options={options ?? []}
              style={{ width: 230 }}
              getOptionLabel={(option) => option.title.toString()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Page Number"
                  placeholder="Select Specific Page"
                />
              )}
            />
            <RoundedButton
              startIcon={<AddIcon />}
              variant={"contained"}
              fullWidth
              size="large"
              onClick={handleClick}
            >
              Add Custom Style For Page
            </RoundedButton>
          </Stack>
        </>
      )}
    </>
  );
}
