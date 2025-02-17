import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { getMyAddresses } from "@/utils/api/address/my-adresses";
import { useQuery } from "@tanstack/react-query";

function useMyAddress() {
  return useQuery({
    queryKey: ["my-address"],
    async queryFn() {
      const headers = await getClientAuthHeaders();
      return await getMyAddresses(headers);
    },
  });
}

export default useMyAddress;
