// MUI
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";

import "./loader.css";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { getMyAddresses } from "@/utils/api/address/my-adresses";
import { Address } from "@/types/common/User";
import axios from "axios";
import { api } from "@/constants/api";
import { toast } from "react-toastify";

export default function AddressesList() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [`user-addresses`],
    queryFn: async () => {
      const headers = await getClientAuthHeaders();
      const response = await getMyAddresses(headers);

      return response.data;
    },
  });

  const handleRefreshAddresses = () => {
    refetch();
  };

  return (
    <Stack p={1} spacing={2} border={"1px solid lightgray"}>
      {isLoading && (
        <Stack height={150} alignItems={"center"} justifyContent={"center"}>
          <div className="loader"></div>
        </Stack>
      )}
      {data?.map((address) => (
        <ExisttingAddress
          handleRefreshAddresses={handleRefreshAddresses}
          key={address.id}
          address={address}
        />
      ))}
    </Stack>
  );
}

const ExisttingAddress = ({
  address,
  handleRefreshAddresses,
}: {
  address: Address;
  handleRefreshAddresses: () => void;
}) => {
  const handleDeleteAddress = async () => {
    const headers = await getClientAuthHeaders();
    axios
      .delete(api`client/address/${address.id}`, { headers })
      .then(() => {
        toast.success(`Address deleted successfully`);
        handleRefreshAddresses();
      })
      .catch(() => {
        toast.error(`Failed to delete address`);
      });
  };
  return (
    <Stack
      p={1.5}
      borderRadius={"12px"}
      bgcolor={"#f9f7f7"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteAddress}>
            <CloseIcon color="error" />
          </IconButton>
        </Tooltip>
        <Typography variant="body2">{address.label}</Typography>
      </Stack>
      <Typography variant="body2">Home address</Typography>
    </Stack>
  );
};
