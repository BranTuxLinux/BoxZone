import NextAuth from "next-auth";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import connectToDatabase from "./lib/mongodb";
import authConfig from "./auth.config";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(connectToDatabase),
  ...authConfig,
  session: { strategy: "jwt" },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});
