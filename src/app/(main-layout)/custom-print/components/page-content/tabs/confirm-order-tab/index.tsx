"use client";
import CustomInputHorizontal from "@/components/custom-inputs/Horizontal";
import { api } from "@/constants/api";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { Order } from "@/types/common/Order";
import useMyAddress from "@/utils/queries/address/myAddress";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  order: Order;
};

function ConfirmOrderTab({ order }: Props) {
  const { data } = useMyAddress();

  const [selectedAddress, setSelectedAddress] = useState<null | number>(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  console.log(selectedAddress);

  return (
    <Stack>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9}>
          <Stack>
            <Typography fontWeight={700} gutterBottom>
              Select your preferable address
            </Typography>
            <Stack spacing={4}>
              {data?.data?.map((address) => (
                <Paper key={address.id} variant="outlined">
                  <CustomInputHorizontal
                    data={{
                      value: `${address.id}`,
                      isSelected: true,

                      content: (
                        <Stack spacing={2}>
                          <Typography fontWeight={700} gutterBottom>
                            {address.city}
                          </Typography>
                          <Typography variant="subtitle2">
                            {address.address_1}
                          </Typography>
                          <Typography variant="subtitle2">
                            {address.address_2}
                          </Typography>
                        </Stack>
                      ),
                    }}
                    handleChange={(e) => {
                      console.log(e);
                      setSelectedAddress(
                        Number(typeof e === "string" ? e : e.target.value)
                      );
                    }}
                    name={`${address.id}`}
                    selected={`${selectedAddress}`}
                    type="radio"
                  />
                </Paper>
              ))}
              <Stack>
                <Button
                  sx={{ mt: 2 }}
                  color="secondary"
                  component={Link}
                  href="/user/profile?tab=address"
                >
                  Add New Address
                </Button>
              </Stack>
              <Button
                onClick={async () => {
                  try {
                    const headers = await getClientAuthHeaders();
                    await axios.post(
                      api`client/cart/delivery-type/${order.id}`,
                      {
                        delivery_type: "door_delivery",
                        address_id: selectedAddress,
                      },
                      { headers }
                    );
                    enqueueSnackbar("Order has been successfully placed!");
                    router.push("/");
                  } catch (error) {
                    toast.error("Unexpected Error :(");
                  }
                }}
              >
                Submit Order
              </Button>
            </Stack>
          </Stack>
          <Stack spacing={4}></Stack>
        </Grid>
        <Grid item xs={12} md={4} lg={3}></Grid>
      </Grid>
    </Stack>
  );
}

export default ConfirmOrderTab;
