import jwt from "jsonwebtoken";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { setCookie } from "cookies-next";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import LoginApi from "../../../services/handle-login";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (user) {
        session.user = user;
      }

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
};

export default NextAuth(authOptions);
