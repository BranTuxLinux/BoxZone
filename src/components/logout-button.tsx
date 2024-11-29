"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  const hC = () => {
    signOut({
        redirectTo: '/login'
    });
  };
  return <Button onClick={hC}>Logout</Button>;
}
