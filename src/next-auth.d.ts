import NextAuth, { DefaultSession } from "next-auth";

// Extend the built-in session type
declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add accessToken to the session object
  }

  interface User {
    id: string;
    token: string;
  }
}

// You may also want to extend the JWT type if you're adding accessToken to JWT
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string; // Add accessToken to the JWT object
  }
}
