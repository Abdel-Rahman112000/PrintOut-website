import { Grid, GridProps } from "@mui/material";
import AspectRatio from "../AspectRatio";
import { ReactNode } from "react";

const GridItem = ({ children, ...props }: GridProps) => (
  <Grid item xs={4} {...props}>
    <AspectRatio> {children}</AspectRatio>
  </Grid>
);

function GridWithRatio({ items }: Props) {
  return (
    <div>
      <Grid container spacing={4}>
        {items.map(({ children, key, gridProps }) => (
          <GridItem key={key} {...gridProps}>
            {children}
          </GridItem>
        ))}
      </Grid>
    </div>
  );
}

type Props = {
  items: GridWithRatioItemType[];
};

export type GridWithRatioItemType = {
  key: any;
  children: ReactNode;
  gridProps?: GridProps;
};

export default GridWithRatio;
