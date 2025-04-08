import { Stack } from "@mui/material";
import PrintTypeFilters from "../print-type-filters/printTypeFilters";
import PrintFiltersContent from "../content";
import FileImagesPreview from "../images-preview";

export default function CustomPrintEntryPoint() {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{
        xs: "center",
        md: "start",
      }}
      justifyContent={{
        xs: "center",
        md: "space-around",
      }}
    >
      {/* print type filters */}
      <PrintTypeFilters />
      {/* content */}
      <PrintFiltersContent />
      {/* preview */}
      <FileImagesPreview />
    </Stack>
  );
}
