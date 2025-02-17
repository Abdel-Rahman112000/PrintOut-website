import { Order } from "@/types/common/Order";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

// Icons
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import AddressesList from "./AddressesList";
import AddNewAddress from "./AddNewAddress";
import { SetStateAction } from "jotai";

export type AddAddressTab = "ActiveList" | "AddAddress";

export default function OrderAddresses(props: PropsType) {
  const { mainOrder } = props;
  const [activeTab, setActiveTab] = useState<AddAddressTab>("ActiveList");

  return (
    <Box m={2} border={"1px solid lightgray"}>
      {/* headers */}
      <Stack
        p={3}
        direction={"row"}
        border={"1px solid lightgray"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Button
          variant="text"
          color="inherit"
          onClick={() => {
            setActiveTab("ActiveList");
          }}
        >
          Addresses
        </Button>
        <Button
          variant="text"
          color="primary"
          endIcon={<AddIcon />}
          onClick={() => {
            setActiveTab("AddAddress");
          }}
        >
          Add new Adress
        </Button>
      </Stack>
      {/* page content */}
      {activeTab === "ActiveList" && <AddressesList />}
      {activeTab === "AddAddress" && (
        <AddNewAddress setActiveTab={setActiveTab} />
      )}
    </Box>
  );
}

type PropsType = {
  mainOrder: Order | undefined;
};
