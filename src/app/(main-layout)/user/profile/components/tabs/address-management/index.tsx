import useMyAddress from "@/utils/queries/address/myAddress";
import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddAddressDialog from "./add-address-dialog";
import { useState } from "react";
import axios from "axios";
import { api } from "@/constants/api";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";

function AddressManagement() {
  const { data, refetch } = useMyAddress();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AddAddressDialog
        open={open}
        setOpen={(isOpen) => setOpen(isOpen)}
        refresh={refetch}
      />
      <Stack spacing={4}>
        <Stack>
          <Button onClick={() => setOpen(true)}>Add New Address</Button>
        </Stack>
        {data?.data?.map((address) => (
          <Paper key={address.id}>
            <Stack p={2} spacing={4} direction="row" alignItems="center">
              <IconButton
                size="small"
                onClick={async () => {
                  try {
                    const headers = await getClientAuthHeaders();
                    await axios.delete(api`client/address/${address.id}`, {
                      headers,
                    });
                    refetch();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
              <div style={{ flexGrow: 1 }}>
                <Typography fontWeight={700} gutterBottom>
                  {address.city}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  {address.address_1}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {address.address_2}
                </Typography>
              </div>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </>
  );
}

export default AddressManagement;
