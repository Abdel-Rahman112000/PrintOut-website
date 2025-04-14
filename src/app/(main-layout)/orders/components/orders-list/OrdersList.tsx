"use client";
import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { UserOrdersCxt } from "../../context/UserOrdersCxt";
import "./loader.css";

// Icons

import OrdersCard from "./components/OrdersCard";
import Link from "next/link";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export default function UsersOrdersList() {
  // declare and define component state and variables
  const { orders, value, activeTabName } = useContext(UserOrdersCxt);
  const order_reverse = orders?.slice().reverse() || [];

  const TheRightScreen = () => {
    switch (activeTabName) {
      case "Track_Order":
        return (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 4,
              }}
            >
              <Typography variant="h6">Orders</Typography>
              <Link href={""}>
                <Typography variant="body1" color="primary">
                  Leave a Rating
                </Typography>
              </Link>
            </Box>
            {order_reverse?.map((order) => (
              <OrdersCard key={order.id} order={order} />
            ))}
          </>
        );
    }
  };
  // return component ui
  return (
    <Grid item md={9} xs={12}>
      <CustomTabPanel value={value} index={0}>
        <TheRightScreen />
      </CustomTabPanel>
    </Grid>
  );
}

// const OrderItem = ({ order }: { order: Order }) => {
//   return (
//     <Stack
//       p={2}
//       spacing={2}
//       bgcolor={"#fafafc"}
//       alignItems={"center"}
//       direction={{
//         xs: "column",
//         md: "row",
//       }}
//       border={"1px solid lightgray"}
//       justifyContent={"space-around"}
//     >
//       <OrderInformation title="OrderId" value={`#${order.id}`} />
//       <OrderInformation
//         title="OrderDate"
//         value={`${new Date(order.created_at).toLocaleDateString()}`}
//       />
//       <OrderInformation title="OrderQuantity" value={`x items`} />
//       <OrderInformation
//         title="OrderDeliveryTime"
//         value={`${
//           order?.order_arrive_at ? new Date(order?.order_arrive_at ?? "") : "_"
//         }`}
//       />
//       <OrderInformation title="OrderAmount" value={`${order.total_price} $`} />
//       <OrderInformation title="PaymentState" value={`${paymentStatus}`} />
//       <Stack>
//         <Typography variant="body2">Details</Typography>
//         <IconButton>
//           <VisibilityIcon />
//         </IconButton>
//       </Stack>
//     </Stack>
//   );
// };

// const OrderInformation = ({
//   title,
//   value,
// }: {
//   title: string;
//   value: string;
// }) => (
//   <Stack>
//     <Typography variant="body2">{title}</Typography>
//     <Typography variant="body2" fontWeight={800}>
//       {value}
//     </Typography>
//   </Stack>
// );
