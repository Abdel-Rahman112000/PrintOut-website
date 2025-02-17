import axios from "axios";

import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import { User } from "@/types/common/User";
import { z } from "zod";
import { strongPasswordSchema } from "@/libs/validation/zod/passwordSchema";
import { numberStringSchema } from "@/libs/validation/zod/numberStringSchema";

interface Root {
  status: boolean;
  message: string;
  data: User;
}

export const RegisterDtoSchema = z.object({
  user_name: z.string().min(6, "Full Name should at least be 6 characters."),
  email: z.string().email(),
  phone: numberStringSchema,
  password: strongPasswordSchema,
});

export type RegisterDtoType = z.infer<typeof RegisterDtoSchema>;

export const registerUser = async (
  headers: AuthHeaders,
  dto: RegisterDtoType
) => {
  return (await axios.post<Root>(api`client/auth/register`, dto, { headers }))
    .data;
};
