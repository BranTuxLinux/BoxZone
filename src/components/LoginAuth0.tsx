"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export const LoginAuth0 = () => {
  return (
    <Button onClick={() => signIn("auth0", { redirectTo: "/dashboard" })}>
      Sign IN
    </Button>
  );
};
export const LogOutAuth0 = () => {
  return <Button onClick={() => signOut({ redirectTo: "/" })}>Logout!</Button>;
};
