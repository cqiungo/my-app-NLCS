import { log } from "console"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InvalidEmailPasswordError } from "./utils/error"

import type { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    // Add other properties from NextAuthUser if needed, e.g.:
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch("http://localhost:3001/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.access_token) {
          throw new InvalidEmailPasswordError("Invalid credentials.");
        }

        return {
          id: data.user._id,
          email: data.user.email,
          name: data.user.username,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          role: data.user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.accessToken as string;
      session.refresh_token = token.refreshToken as string;
      session.user.role = token.role as string;
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
});
