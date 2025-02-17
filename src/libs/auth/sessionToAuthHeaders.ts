import type { Session } from "next-auth";

import type { AuthHeaders } from "@/types/AuthHeaders";

export const sessionToAuthHeaders = (
  session: Session | undefined | null,
  headers?: AuthHeaders
): AuthHeaders => {
  if (!session?.accessToken) return { ...headers };

  return { Authorization: `Bearer ${session.accessToken}`, ...headers };
};
