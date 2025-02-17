import axios from "axios";

import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import { User } from "@/types/common/User";
import { z } from "zod";
import { strongPasswordSchema } from "@/libs/validation/zod/passwordSchema";

interface Root {
  status: boolean;
  message: string;
  data: User;
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const LoginDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginDtoType = z.infer<typeof LoginDtoSchema>;

export const login = async (headers: AuthHeaders, dto: LoginDtoType) => {
  return (await axios.post<Root>(api`client/auth/login`, dto, { headers }))
    .data;
};
