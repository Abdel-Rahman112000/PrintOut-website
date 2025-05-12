import { Container, Grid, Stack } from "@mui/material";
import PrintTypeFilters from "../print-type-filters/printTypeFilters";
import PrintFiltersContent from "../content";
import FileImagesPreview from "../images-preview";

export default function CustomPrintEntryPoint() {
  return (
    <Container
      sx={{
        maxWidth: {
          xs: "sm",
          sm: "md",
          md: "lg",
          xl: "xl",
        },
        mt: 5,
      }}
    >
      <Grid container spacing={5}>
        {/* print type filters */}
        <Grid item xs={12} md={3}>
          <PrintTypeFilters />
        </Grid>
        {/* content */}
        <Grid item xs={12} md={6}>
          <PrintFiltersContent />
        </Grid>

        {/* preview */}
        <Grid item xs={12} md={3}>
          <FileImagesPreview />
        </Grid>
      </Grid>
    </Container>
  );
}
