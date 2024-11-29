import { auth } from "@/auth";
import LoginButtonGoogle from "@/components/LoginGoogle-Button";
import LogoutBtn from "@/components/logout-button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  console.log({session})
  if (!session) {
    return (
      <div className="container h-screen  flex justify-around items-center">
        <h1>hello </h1>
        <Link href={"/login"}>Login</Link>
        <Link href={"/register"}>Register</Link>
        <LoginButtonGoogle />
      </div>
    );
  }
  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <hr />
      <br />
      <LogoutBtn />
    </div>
  );
}
