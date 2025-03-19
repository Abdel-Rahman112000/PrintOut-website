import { Button, Stack, TextField } from "@mui/material";
import AddressMap from "./AddressMap";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { useState } from "react";
import axios from "axios";
import { api } from "@/constants/api";
import { toast } from "react-toastify";
import { SetStateAction } from "jotai";
import { AddAddressTab } from ".";

export default function AddNewAddress(props: PropsType) {
  const { setActiveTab } = props;
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    watch,
  } = useForm<FormType>({ mode: "onSubmit" });
  const [addressPosition, setAddressPosition] = useState<[number, number]>([
    30.0444, 31.2357,
  ]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const headers = await getClientAuthHeaders();
      const body = {
        ...data,
        default: 1,
        latitude: addressPosition[0],
        longitude: addressPosition[1],
      };
      axios
        .post(api`client/address`, body, { headers })
        .then(() => {
          toast.success("Address added successfully");
          setActiveTab("ActiveList");
          reset({});
        })
        .catch((err) => {
          toast.error("Failed to add address");
        });
    } catch (error) {
      toast.error("Failed to add address");
    }
  });

  return (
    <Stack
      p={1}
      spacing={2}
      border={"1px solid lightgray"}
      component="form"
      onSubmit={onSubmit}
    >
      <TextField
        size="small"
        id="label"
        label="Label"
        variant="outlined"
        {...register("label")}
        disabled={isSubmitting}
        helperText={errors.label && errors.label.message}
      />

      <TextField
        size="small"
        id="address-line-1"
        label="Address line 1"
        variant="outlined"
        {...register("address_1")}
        disabled={isSubmitting}
        helperText={errors.address_1 && errors.address_1.message}
      />

      <TextField
        size="small"
        id="address-line-2"
        label="Address line 2"
        variant="outlined"
        {...register("address_2")}
        disabled={isSubmitting}
        helperText={errors.address_2 && errors.address_2.message}
      />

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <TextField
          size="small"
          sx={{ flexGrow: 1, mx: 0.5 }}
          id="city"
          label="City"
          variant="outlined"
          {...register("city")}
          disabled={isSubmitting}
          helperText={errors.city && errors.city.message}
        />
        <TextField
          size="small"
          sx={{ flexGrow: 1, mx: 0.5 }}
          id="zip-code"
          label="Zip Code"
          variant="outlined"
          {...register("zib_code")}
          disabled={isSubmitting}
          helperText={errors.zib_code && errors.zib_code.message}
        />
      </Stack>

      <AddressMap
        markerPosition={addressPosition}
        setMarkerPosition={setAddressPosition}
      />

      <Button variant="contained" color="primary" type="submit">
        Save Address
      </Button>
    </Stack>
  );
}

const schema = z.object({
  address_1: z.string().min(1, { message: "Address line 1 is required" }),
  address_2: z.string().min(1, { message: "Address line 2 is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zib_code: z.string().min(1, { message: "Zip Code is required" }),
  latitude: z.string(),
  longitude: z.string(),
  label: z.string().min(1, { message: "Label is required" }),
});

type FormType = z.infer<typeof schema>;

type PropsType = {
  setActiveTab: React.Dispatch<SetStateAction<AddAddressTab>>;
};
