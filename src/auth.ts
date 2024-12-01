import NextAuth from "next-auth";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import connectToDatabase from "./lib/mongodb";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(connectToDatabase),
  ...authConfig,
  session: { strategy: "jwt" },

  callbacks: {
    async signIn({account,profile}){
      console.log({account, profile})
      // if (account?.provider === "google") {
      //   return profile?.email_verified && profile?.email?.endsWith("@example.com")
      // }
      return true 
    },

    jwt({ token, user }) {
      console.log(user)
      if (user) {
        // User is available during sign-in
        token.role = user.role;
        token.img = user.picture;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.img = token.img;

      return session;
    },
  },
});
