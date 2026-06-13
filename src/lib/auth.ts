import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validations/auth";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Admin credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        if (
          parsed.data.email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase() &&
          parsed.data.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "admin",
            email: process.env.ADMIN_EMAIL,
            name: "W.M. Prabodha Lakshan",
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = String(token.id ?? token.sub);
      return session;
    },
  },
};
