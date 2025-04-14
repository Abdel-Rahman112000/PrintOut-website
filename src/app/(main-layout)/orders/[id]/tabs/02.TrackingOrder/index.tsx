import { Box, Stack, Typography } from "@mui/material";
import DeliveryOrderSteps from "./DeliveryOrderSteps";
import OrderActivities from "./OrderActivities";
import ProductsTable from "./ProductsTable";
import { Order } from "@/types/common/Order";
import TrackGoogleMap from "./TrackGoogleMap";
export const statusMap: Record<string, number> = {
  waiting_confirmation: 0,
  ready_pickup: 1,
  picked_up: 2,
  delivered: 3,
  completed: 4,
};
export default function TrackingOrder(props: PropsType) {
  const { mainOrder } = props;
  const orderStatusKey = mainOrder?.status_show?.key ?? "";

  const numericStatus = statusMap[orderStatusKey] ?? 0;
  return (
    <Box p={3} m={5} border={"1px solid lightgray"}>
      {/* title */}
      <Typography variant="body2" fontSize={20} fontWeight={500}>
        Order Details
      </Typography>
      {/* Order information */}
      <Stack
        my={2}
        p={3}
        bgcolor={"#FDFAE7"}
        alignItems={"center"}
        justifyContent={"space-between"}
        border={"1px solid lightgray"}
        direction={{ xs: "column", md: "row" }}
      >
        <Box>
          <Typography variant="body2" fontSize={20}>
            #{mainOrder?.id}
          </Typography>
          <Typography variant="body2" fontSize={18}>
            {mainOrder?.orders?.length ?? 0} Products •{" "}
            {mainOrder?.created_at
              ? `Order Placed in ${new Date(
                  mainOrder?.created_at
                ).toLocaleDateString()}`
              : ""}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          fontSize={24}
          fontWeight={600}
          color={"#2DA5F3"}
        >
          {mainOrder?.total_price} EGP
        </Typography>
      </Stack>
      {/* Delivery Order Steps */}
      <DeliveryOrderSteps mainOrder={mainOrder} />
      {/* TrackingDeliveryMap */}
      {numericStatus == 2 && <TrackGoogleMap />}
      {/* orders activities */}
      <OrderActivities mainOrder={mainOrder} />
      {/* Products table */}
      <ProductsTable mainOrder={mainOrder} />
      {/*  */}
    </Box>
  );
}

type PropsType = {
  mainOrder: Order | undefined;
};
