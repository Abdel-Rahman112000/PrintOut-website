import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import axios from "axios";
import { User } from "@/types/common/User";

interface Root {
  status: boolean;
  message: string;
  data: User;
}

export const getMeData = async (headers: AuthHeaders) => {
  const res = await axios.get<Root>(api`client/auth/me`, {
    headers,
  });
  
  return res.data;
};
