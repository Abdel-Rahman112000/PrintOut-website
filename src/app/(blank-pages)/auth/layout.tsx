import { withNoAuth } from "@/guards/auth.guard";
import { ReactNode } from "react";

function AuthLaout({ children }: { children: ReactNode }) {
  return children;
}

export default withNoAuth(AuthLaout);
