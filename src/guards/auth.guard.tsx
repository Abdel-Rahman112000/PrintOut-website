// types
import type { FC } from "react";

import { redirect } from "next/navigation";

// import packages
import axios from "axios";

import { Typography } from "@mui/material";
import { api } from "@/constants/api";
import { getServerAuthHeaders } from "@/libs/auth/getServerAuthHeaders";
import { getAuthSession } from "@/libs/auth/getAuthSession";

const NotAuthorized = () => <Typography>Not Authorized</Typography>;

async function isAuthorized(headers: Record<string, string>) {
  return true;
  return await axios.post(api`client/auth/me`, undefined, {
    headers,
  });
}

// Higher Order Function for auth check
export function withAuth<T extends FC<any>>(ServerComponent: T) {
  // Returns a new function component
  return async function AuthenticatedComponent(props: any) {
    const headers = await getServerAuthHeaders();

    if (!headers.Authorization) redirect("/auth/login");

    try {
      await isAuthorized(headers);

      return <ServerComponent {...props} />;
    } catch (error) {
      console.log(error);
      return <NotAuthorized />;
    }
  };
}

// Higher Order Function for auth check
export function withNoAuth<T extends FC<any>>(ServerComponent: T) {
  // Returns a new function component
  return async function AuthenticatedComponent(props: any) {
    const headers = await getServerAuthHeaders();

    if (!headers.Authorization) return <ServerComponent {...props} />;
    else {
      redirect("/");
    }
  };
}

export async function requireAuth() {
  const headers = await getServerAuthHeaders();

  if (!headers.Authorization) {
    redirect("/auth/login");
  }

  try {
    await isAuthorized(headers);
  } catch (error) {
    redirect("/auth/logout");
  }
}

export async function requireNoAuth() {
  const session = await getAuthSession();

  if (session) {
    redirect("/users");
  }
}
