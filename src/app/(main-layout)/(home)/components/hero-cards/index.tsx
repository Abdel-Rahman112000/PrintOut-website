import AspectRatio from "@/components/AspectRatio";
import { IMAGE_FIT_STYLES } from "@/constants/image-fit-styles";
import { Container, Grid, Paper } from "@mui/material";

function HeroCards() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <AspectRatio variant="allow-overflow" ratio={16 / 9}>
            <Paper
              elevation={6}
              component="img"
              sx={{
                ...IMAGE_FIT_STYLES,
                ":hover": {
                  transform: "scale(1.05)",
                },
              }}
              src="/assets/images/demo/Fouty precentage.jpeg"
            />
          </AspectRatio>
        </Grid>
        <Grid item xs={12} md={6}>
          <AspectRatio variant="allow-overflow" ratio={16 / 9}>
            <Paper
              elevation={6}
              component="img"
              sx={{
                ...IMAGE_FIT_STYLES,
                ":hover": {
                  transform: "scale(1.05)",
                },
              }}
              src="/assets/images/demo/Fiftypresentage.jpeg"
            />
          </AspectRatio>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HeroCards;
