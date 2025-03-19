"use client";
import { Order } from "@/types/common/Order";
import { Box, Chip, Stack, Typography } from "@mui/material";
import rightImg from "@/assets/images/rightImg.png";
import { useRouter } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function OrdersCard({ order }: { order: Order }) {
  const router = useRouter();
  const paymentStatus =
    order.payment == -1 ? "Pending" : order.payment == 0 ? "Faild" : "Success";

  const GoToDetails = () => {
    router.push(`/orders/${order.id}`);
  };
  return (
    <>
      <Stack
        mb={5}
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          background: "#FAFAFC",
        }}
        onClick={GoToDetails}
      >
        <Box>
          <img
            src={rightImg.src}
            width={120}
            height={120}
            alt="print type image"
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Stack sx={{ width: "100%", px: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "280px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Order Id :</Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, fontSize: "16px", ml: 1 }}
                >
                  #{order.id}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircleIcon color="primary" sx={{ mr: 0.2 }} />
                <Typography variant="body1">{paymentStatus}</Typography>
              </Box>
            </Box>
            <Typography variant="h6">EGP{order.total_price}</Typography>
          </Box>
          <Typography variant="body1">{order.address}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              mt: 3,
            }}
          >
            <Chip
              label={order.status_show?.name}
              variant="filled"
              style={{ backgroundColor: order.status_show?.badge_color }}
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" sx={{ mx: 2 }}>
                Delivering in
              </Typography>
              <Chip label={`${order.delivery_within} Days`} color="primary" />
            </Box>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

export default OrdersCard;
