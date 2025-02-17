import AspectRatio from "@/components/AspectRatio";
import { IMAGE_FIT_STYLES } from "@/constants/image-fit-styles";
import { Grid, Typography } from "@mui/material";

function Breif() {
  return (
    <div>
      <Grid container spacing={4} alignItems={"center"}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Create your custom design</Typography>
          <Typography color="text.secondary">
            100% Premium Ceramic – makes the mug extra durable & glossy.
            Flexible handle design. Precisely printed with no chipping & no
            fading. Provide all-time enjoyment. Anytime, anywhere. Infinite
            range of matte-finish custom prints.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <AspectRatio ratio={16 / 9}>
            <img
              src="/assets/images/demo/home-page-sale.png"
              style={IMAGE_FIT_STYLES}
              alt="placeholder"
            />
          </AspectRatio>
        </Grid>
      </Grid>
    </div>
  );
}

export default Breif;
