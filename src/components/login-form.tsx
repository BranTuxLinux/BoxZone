"use client";
import { LoginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAction, LoginGoogle } from "@/actions/auth-actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import GoogleIcon from "./svgs/GoogleIcon";
import Link from "next/link";
export default function FormLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      const response = await loginAction(values);
      console.log(response);
      if (response.error) setError(response.error);
      else router.push("/dashboard");
    });
  }
  return (
    <>
      <div className="container max-w-xs  p-10 rounded-lg items-center justify-center flex flex-col ">
        <div className="w-full">
          <h1 className="text-center text-4xl text-nowrap my-10">
            Ingresa Sesión
          </h1>
          <h4 className="text-1xl">Con Google</h4>
          <Button
            type="submit"
            disabled={isPending}
            className="container py-5 relative"
            variant={"outline"}
            onClick={LoginGoogle}
          >
            <GoogleIcon className={""} />
            <p>Google</p>
          </Button>
        </div>
        <br />
        <h1>or</h1>
        <br />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email </FormLabel>
                  <FormControl>
                    <Input placeholder="your@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*******" type="password" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <FormMessage>{error}</FormMessage>}
            <Button
              type="submit"
              disabled={isPending}
              className="container py-5"
            >
              Login
            </Button>
          </form>
        </Form>
        <h4 className="text-1xl text-center  ">
          <span >¿No tienes Cuenta?</span>
          <br />
          <span className=" opacity-50  hover:opacity-100 cursor-pointer">
            <Link href={"/register"}>
          Regístrate Aquí 
            </Link>

          </span>
        </h4>
      </div>
    </>
  );
}
