import { cookies } from "next/headers";

export const defaultHeaders = () => {
  const useCookies = cookies();
  const token = useCookies.get("token")?.value;
  return {
    // Check if token exists
    ...(token ? { Authorization: `Bearer ${token}` } : undefined),
  };
};
