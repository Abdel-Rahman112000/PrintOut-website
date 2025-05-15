import axios from "axios";
import { api } from "@/constants/api";
import { AuthHeaders } from "@/types/AuthHeaders";
import { useMutation } from "@tanstack/react-query";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";

type PageSettingsData = {
//   title: string;
//   isPublished: boolean;
};

export const postPageSettings = async (
  data: PageSettingsData
) => {
  const headers = await getClientAuthHeaders(); 
  const response = await axios.post(
    api(``), 
    data,
    { headers }
  );
  return response.data;
};

// hooks/users/useCreateUser.ts

export const usePageSettings = () => {
  return useMutation({
    mutationFn: (data: PageSettingsData) => postPageSettings(data),
  });
};