import { Grid } from "@mui/material";

export default function VideoDesciption() {
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <video
        width="320"
        height="240"
        controls
        style={{
          width: "532px",
          height: "328px",
          borderRadius: "12px",
        }}
      >
        <source src="movie.mp4" type="video/mp4" />
        <source src="movie.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </Grid>
  );
}
