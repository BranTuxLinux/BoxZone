import { DefaultSession } from "next-auth";
import "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      picture?: string;
    } & DefaultSession["users"];
  }
  interface User {
    role?: string;
    picture?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    img?: string;
  }
}
