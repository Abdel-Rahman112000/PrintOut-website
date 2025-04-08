import { Grid } from "@mui/material";

import { Order } from "@/types/common/Order";
import TrackingOrder from "./02.TrackingOrder";

export default function MainOrderDetailsTabs(props: PropsType) {
  const { mainOrder } = props;

  return (
    <Grid item xs={12} md={8}>
      <TrackingOrder mainOrder={mainOrder} />
    </Grid>
  );
}

type PropsType = {
  mainOrder: Order | undefined;
};
