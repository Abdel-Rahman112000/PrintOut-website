import { api } from "@/constants/api";
import { AuthHeaders } from "@/types/AuthHeaders";
import axios from "axios";
import { z } from "zod";

export const addAddressSchema = z.object({
  address_1: z.string().min(1, "Address 1 is required"),
  address_2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  zib_code: z.string().regex(/^\d{6,10}$/, "Zip Code must be 6-10 digits"),
  // default: z.enum(["0", "1"]).transform((val) => Boolean(Number(val))),
});

// Define TypeScript types based on the Zod schema
export type AddressFormData = z.infer<typeof addAddressSchema>;

export const addAddress = async (
  headers: AuthHeaders,
  dto: AddressFormData
) => {
  return (
    await axios.post<{ total_order: number }>(api`client/address`, dto, {
      headers,
    })
  ).data;
};
