"use client";

import RoundedButton from "@/components/RoundedButton";
import {
  Box,
  Grid,
  IconButton,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { CartPageCxt } from "../../context/CartPageCxt";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import axios from "axios";
import { api } from "@/constants/api";
import { useRouter } from "next/navigation";
import AddressesList from "./AddressesList";
import AddLabelToEl from "@/components/AddLabelToEl";
import AddIcon from "@mui/icons-material/Add";
export default function CartInformation() {
  const {
    totalItems,
    setSelectedMethod,
    selectedMethod,
    loading,
    cartItemsQueryData,
    depositeNumber,
  } = useContext(CartPageCxt);

  return (
    <Stack p={3} spacing={3}>
      <Typography variant="h6" fontWeight={500} fontSize={22}>
        Enter your data
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <AddLabelToEl label="Name">
            <TextField fullWidth variant="outlined" size="small" />
          </AddLabelToEl>
        </Grid>
        <Grid item xs={12} md={6}>
          <AddLabelToEl label="Phone Number">
            <TextField fullWidth variant="outlined" size="small" />
          </AddLabelToEl>
        </Grid>
      </Grid>

      <Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={500}
            fontSize={22}
            sx={{
              ms: 2,
            }}
          >
            Select your preferable address
          </Typography>
          <IconButton href="">
            <AddIcon />
          </IconButton>
        </Box>
        <AddressesList />
      </Stack>
      {/* buttons */}
      <Stack direction="row" spacing={4} justifyContent="center">
        {/* Cash Option */}
        <Box
          onClick={() => {
            setSelectedMethod("cash");
          }}
          sx={{
            border: "2px solid",
            borderColor:
              selectedMethod === "cash" ? "primary.main" : "grey.300",
            borderRadius: 2,
            p: 3,
            minWidth: 250,
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <Typography variant="h5" fontWeight={500}>
            💵
          </Typography>
          <Typography variant="h5" fontWeight={500}>
            Cash ( Have to pay Deposit <br />
            {depositeNumber} % )
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Pay on delivery by cash
          </Typography>
          <Radio
            checked={selectedMethod === "cash"}
            sx={{ mt: 2 }}
            disabled={loading || totalItems == 0}
          />
        </Box>

        {/* Card Option */}
        <Box
          onClick={() => {
            setSelectedMethod("visa");
          }}
          sx={{
            border: "2px solid",
            borderColor:
              selectedMethod === "visa" ? "primary.main" : "grey.300",
            borderRadius: 2,
            p: 3,
            minWidth: 250,
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <Typography variant="h5" fontWeight={500}>
            💳
          </Typography>
          <Typography variant="h5" fontWeight={500}>
            Pay via Card
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            We keep your data safe by using external Payment gateway
          </Typography>
          <Radio
            checked={selectedMethod === "visa"}
            sx={{ mt: 2 }}
            disabled={loading || totalItems == 0}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
