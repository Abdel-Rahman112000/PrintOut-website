import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define the User type
interface User {
  id: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        token: {
          label: "Token",
          type: "text",
          placeholder: "Enter your token",
        },
      },
      async authorize(credentials) {
        console.log({ credentials });
        const token = credentials?.token;

        if (!token) {
          throw new Error("Token is required");
        }

        // You would typically validate the token or call an API here.
        // Assuming the token is valid, return a User object with at least an id and token.

        // Mock user data (you should replace this with actual logic)
        const user: User = {
          id: "mock-id",
          token,
        };

        // Return the user object if the token is valid
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If it's a new sign-in, store the accessToken
      if (user) {
        token.accessToken = (user as User).token;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the accessToken to the session
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin", // Redirect to custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
};
