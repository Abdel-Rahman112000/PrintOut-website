"use client";
import {
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { UserOrdersCxt } from "../../context/UserOrdersCxt";
import { Order } from "@/types/common/Order";

import "./loader.css";

// Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";

export default function UsersOrdersList() {
  // declare and define component state and variables
  const { orders, loadingOrders } = useContext(UserOrdersCxt);

  // return component ui
  return (
    <Container>
      {/* orders page header */}
      <Stack
        p={1}
        mt={5}
        border={"1px solid lightgray"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h6" fontSize={22} fontWeight={800}>
          Orders
        </Typography>
      </Stack>

      <Stack spacing={2} border={"1px solid lightgray"}>
        {loadingOrders && (
          <Stack height={150} alignItems={"center"} justifyContent={"center"}>
            <div className="loader"></div>
          </Stack>
        )}

        {!loadingOrders && orders.length == 0 && (
          <Typography variant="body2">There is no orders</Typography>
        )}

        {!loadingOrders &&
          orders.length > 0 &&
          orders?.map((order) => <OrderItem key={order.id} order={order} />)}
      </Stack>
    </Container>
  );
}

const OrderItem = ({ order }: { order: Order }) => {
  const router = useRouter();
  const paymentStatus =
    order.payment == -1 ? "Pending" : order.payment == 0 ? "Faild" : "Success";

  const GoToDetails = () => {
    router.push(`/orders/${order.id}`);
  };

  return (
    <Stack
      p={2}
      spacing={2}
      bgcolor={"#fafafc"}
      alignItems={"center"}
      direction={{
        xs: "column",
        md: "row",
      }}
      border={"1px solid lightgray"}
      justifyContent={"space-around"}
    >
      <OrderInformation title="OrderId" value={`#${order.id}`} />
      <OrderInformation
        title="OrderDate"
        value={`${new Date(order.created_at).toLocaleDateString()}`}
      />
      {/* <OrderInformation title="OrderQuantity" value={`x items`} /> */}
      <OrderInformation
        title="OrderDeliveryTime"
        value={`${
          order?.order_arrive_at ? new Date(order?.order_arrive_at ?? "") : "_"
        }`}
      />
      <OrderInformation title="OrderAmount" value={`${order.total_price} $`} />
      <OrderInformation title="PaymentState" value={`${paymentStatus}`} />
      <Stack>
        <Typography variant="body2">Details</Typography>
        <IconButton onClick={GoToDetails}>
          <VisibilityIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

const OrderInformation = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => (
  <Stack>
    <Typography variant="body2">{title}</Typography>
    <Typography variant="body2" fontWeight={800}>
      {value}
    </Typography>
  </Stack>
);
