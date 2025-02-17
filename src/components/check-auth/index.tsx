"use client";

import { useEffect } from "react";

import { signOut } from "next-auth/react";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { getMyAddresses } from "@/utils/api/address/my-adresses";

function OnClientCheckAuth() {
  async function check() {
    try {
      const headers = await getClientAuthHeaders();

      if (headers.Authorization) {
        await getMyAddresses(headers);
      }
    } catch (error) {
      signOut();
    }
  }

  useEffect(() => {
    check();
  }, []);

  return null;
}

export default OnClientCheckAuth;
