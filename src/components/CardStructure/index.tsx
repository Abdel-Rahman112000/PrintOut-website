import { Grid, SxProps } from "@mui/material";
import HoverableBox from "../HoverableBox";

function CardStructure({ mainContent, mediaContent, sx }: Props) {
  return (
    <HoverableBox sx={{ p: 2, ...sx }}>
      <Grid container spacing={2}>
        <Grid item xs={9} md={3}>
          {mediaContent}
        </Grid>
        <Grid item xs={12} md={9}>
          {mainContent}
        </Grid>
      </Grid>
    </HoverableBox>
  );
}

type Props = {
  mainContent?: React.ReactNode;
  mediaContent?: React.ReactNode;
  sx?: SxProps;
};

export type CardStructureProps = Props;
export default CardStructure;
