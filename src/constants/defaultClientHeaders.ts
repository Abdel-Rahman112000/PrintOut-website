import Cookies from "js-cookie";

export const defaultClientHeaders = () => {
  const token = Cookies.get("token");
  return {
    // Check if token exists
    ...(token ? { Authorization: `Bearer ${token}` } : undefined),
  };
};
