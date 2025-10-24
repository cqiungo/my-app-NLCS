import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { IUser } from "./types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.access_token) {
          console.warn("❌ Sai email hoặc mật khẩu:", data);
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          accessToken: data.access_token,
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
      if (user){
        token.user = user as IUser;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as IUser) = token.user;
      session.access_token = token.user?.accessToken;
      session.user.role = token.user?.role;
      return session;
    },
    authorized: async ({ auth }) => !!auth,
  },
  session: { strategy: "jwt" },
});
