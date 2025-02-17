import { Grid, GridProps } from "@mui/material";

function MainGrid({ first, second, containerProps }: Props) {
  return (
    <Grid container {...containerProps}>
      <Grid
        item
        xs={12}
        md={6}
        lg={5}
        px={{ xs: undefined, lg: 2 }}
        {...first?.props}
      >
        {first?.children}
      </Grid>
      {second && (
        <Grid
          item
          xs={12}
          md={6}
          lg={7}
          px={{ xs: undefined, lg: 2 }}
          {...second?.props}
        >
          {second?.children}
        </Grid>
      )}
    </Grid>
  );
}

type Props = {
  containerProps?: GridProps;
  first?: MainGridItemProps;
  second?: MainGridItemProps;
};

type MainGridItemProps = {
  children?: React.ReactNode;
  props?: GridProps;
};

export default MainGrid;
