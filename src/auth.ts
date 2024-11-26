import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import connectToDatabase from "./lib/mongodb"
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(connectToDatabase),
  providers: [],
})