// MUI
import { IconButton, Stack, Typography } from "@mui/material";

import "./loader.css";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import AdjustIcon from "@mui/icons-material/Adjust";

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
      <Typography variant="body2" fontSize={18} fontWeight={500}>
        Addresses
      </Typography>
      {isLoading && (
        <Stack height={150} alignItems={"center"} justifyContent={"center"}>
          <div className="loader"></div>
        </Stack>
      )}
      {data?.map((address) => (
        <ExisttingAddress
          key={address.id}
          address={address}
          handleRefreshAddresses={handleRefreshAddresses}
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
  const handleChangeOrderAddress = async () => {
    const headers = await getClientAuthHeaders();
    axios
      .put(api`client/address/${address.id}`, { default: 1 }, { headers })
      .then(() => {
        toast.success("Order Address Selected Successfully");
        handleRefreshAddresses();
      })
      .catch(() => {
        toast.error("Failed To Change Order Address");
      });
  };

  return (
    <Stack
      p={1.5}
      borderRadius={"12px"}
      bgcolor={"#f9f7f7"}
      direction={"row"}
      alignItems={"center"}
      border={address.default == 1 ? "2px solid lightblue" : undefined}
      justifyContent={"space-between"}
    >
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <IconButton onClick={handleChangeOrderAddress}>
          {address.default == 1 ? (
            <AdjustIcon color="primary" />
          ) : (
            <TripOriginIcon />
          )}
        </IconButton>
        <Typography variant="body2">{address.label}</Typography>
      </Stack>
    </Stack>
  );
};
