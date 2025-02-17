import { Order, SubOrderType } from "@/types/common/Order";
import { Box, Chip, Stack, Typography } from "@mui/material";

export default function MainOrderProducts(props: PropsType) {
  const { mainOrder } = props;

  return (
    <Box>
      <Typography variant="body2" fontSize={20} fontWeight={500}>
        Products
      </Typography>
      <Stack spacing={2}>
        {mainOrder?.orders?.map((subOrder) => (
          <OrderProductCard key={subOrder.id} subOrder={subOrder} />
        ))}
      </Stack>
    </Box>
  );
}

const OrderProductCard = ({ subOrder }: { subOrder: SubOrderType }) => {
  return (
    <Stack
      p={1}
      my={2}
      spacing={2}
      height={"160px"}
      bgcolor={"#fafafc"}
      direction={{ xs: "column", md: "row" }}
    >
      <img
        src={subOrder?.media?.[0]?.original_url ?? ""}
        width={245}
        height={"100%"}
        alt="product image"
        style={{ objectFit: "cover" }}
      />
      <Stack
        width={"calc(100% - 245px)"}
        justifyContent={"space-between"}
        direction={{ xs: "column", md: "row" }}
      >
        <Stack justifyContent={"space-between"}>
          <Typography variant="h5" fontSize={22} fontWeight={600}>
            {subOrder.product_name??'Product Name'}
          </Typography>
          {/* <Typography variant="body2" fontSize={18}>
            some description about the product
          </Typography> */}
          <Stack direction={"row"} spacing={2}>
            <Chip label="Delivering" />
            <Chip label="6 Hours Remaining" />
          </Stack>
        </Stack>
        <Typography variant="body1" fontSize={20} fontWeight={600}>
          EGP{subOrder.total_price}
        </Typography>
      </Stack>
    </Stack>
  );
};

type PropsType = {
  mainOrder: Order | undefined;
};
