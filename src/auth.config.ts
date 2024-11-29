import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/zod";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import mongooseDB from "./lib/mongoose";
import User from "./backend/models/User";

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      profile(profile) {
        return { role: profile.role ?? "user", ...profile };
      },
    }),
    Credentials({
      authorize: async (credentials) => {
        await mongooseDB()
        console.log({ credentials });
        const { data, success } = LoginSchema.safeParse(credentials);
        if (!success) {
          throw new Error("Invalid Credentials");
        }


        //Camnbiar
        const user = await User.findOne({
          email: data.email,
        });
        console.log(user);
        if (!user) {
          throw new Error("User not founded");
        }
        console.log({ data: data.password, pass: user.password });
        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
          throw new Error("contrase;as no coinciden");
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
