"use client";
import React from "react";
import { Button } from "./ui/button";
import { LoginGoogle } from "@/actions/auth-actions";

function LoginButtonGoogle() {
  const hc = () => { 
    LoginGoogle()
   }
  return <Button onClick={hc}>Google</Button>;
}

export default LoginButtonGoogle;
