"use server";
import { signIn } from "@/auth";
import { signOut } from "next-auth/react";

export const LogoutAction = async () => {
  await signOut({ redirectTo: "/dashboard" });
};
export const LoginGoogle = async () => {
  await signIn("auth0", { redirectTo: "/" });
};

