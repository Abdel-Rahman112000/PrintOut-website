import { Box, Stack, Typography } from "@mui/material";

// Icons
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { Order } from "@/types/common/Order";

export default function OrderActivities(props: PropsType) {
  const { mainOrder } = props;

  return (
    <Stack spacing={3}>
      <Typography variant="body2" fontWeight={500} fontSize={18}>
        OrderActivities
      </Typography>
      {mainOrder?.order_status?.map((status) => (
        <OrderActivityItem
          key={status.id}
          bgcolor={status.action === 1 ? "#D5EDFD" : "#D5F0D3"}
          statement={status.status}
          subStatement={status.updated_at ? new Date(status.updated_at).toLocaleString() : '-'}
          icon={<DateRangeOutlinedIcon color="success" />}
        />
      ))}
      {/* <OrderActivityItem
        bgcolor="#D5F0D3"
        statement="Your order has been Printed successfully."
        subStatement="23 Jan, 2021 at 7:32 PM"
        icon={<DoneAllIcon color="success" />}
      />
      <OrderActivityItem
        bgcolor="#D5EDFD"
        statement="Our delivery man (John Wick) Has picked-up your order for delvery. "
        subStatement="23 Jan, 2021 at 2:00 PM"
        icon={<PersonOutlinedIcon color="primary" />}
      />
      <OrderActivityItem
        bgcolor="#D5F0D3"
        statement="Your order is successfully verified."
        subStatement="20 Jan, 2021 at 7:32 PM"
        icon={<CheckCircleOutlinedIcon color="success" />}
      />
      <OrderActivityItem
        bgcolor="#D5EDFD"
        statement="Your order has been confirmed."
        subStatement="19 Jan, 2021 at 2:61 PM"
        icon={<DateRangeOutlinedIcon color="primary" />}
      /> */}
    </Stack>
  );
}

const OrderActivityItem = (props: OrderActivityItemProps) => {
  const { statement, subStatement, icon, bgcolor } = props;

  return (
    <Stack direction={"row"} spacing={2}>
      {/* icon */}
      <Stack
        width={48}
        height={48}
        bgcolor={bgcolor}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {icon}
      </Stack>
      {/* information */}
      <Box>
        <Typography variant="body1">{statement}</Typography>
        <Typography variant="body2">{subStatement}</Typography>
      </Box>
    </Stack>
  );
};

type OrderActivityItemProps = {
  statement: string;
  subStatement: string;
  icon: JSX.Element;
  bgcolor: string;
};

type PropsType = {
  mainOrder: Order | undefined;
};
