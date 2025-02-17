import { Box, Stack, Typography } from "@mui/material";
import DeliveryOrderSteps from "./DeliveryOrderSteps";
import OrderActivities from "./OrderActivities";
import ProductsTable from "./ProductsTable";
import TrackingDeliveryMap from "./TrackingMap";
import { Order } from "@/types/common/Order";

export default function TrackingOrder(props: PropsType) {
  const { mainOrder } = props;

  return (
    <Box p={3} my={3} border={"1px solid lightgray"}>
      {/* title */}
      <Typography variant="body2" fontSize={20} fontWeight={500}>
        Order Details
      </Typography>

      {/* Order information */}
      <Stack
        my={2}
        p={5}
        bgcolor={"#F7E99E"}
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
          ${mainOrder?.total_price}
        </Typography>
      </Stack>

      {/* Delivery Order Steps */}
      <DeliveryOrderSteps mainOrder={mainOrder} />

      {/* TrackingDeliveryMap */}
      <TrackingDeliveryMap />

      {/* orders activities */}
      <OrderActivities mainOrder={mainOrder} />

      {/* Products table */}
      <ProductsTable mainOrder={mainOrder}/>

      {/*  */}
    </Box>
  );
}

type PropsType = {
  mainOrder: Order | undefined;
};
