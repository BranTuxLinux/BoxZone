"use client";
import { RegisterSchema } from "@/lib/zod";
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
import { LoginGoogle, registerAction } from "@/actions/auth-actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import GoogleIcon from "./svgs/GoogleIcon";
import Link from "next/link";
import { Separator } from "./ui/separator";
export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    console.log({values})
    startTransition(async () => {
      const response = await registerAction(values);
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
            Resgistrate
          </h1>
        </div>
       

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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Zoe Quintero" type="text" {...field} />
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
            <br />
            <Separator />
        <br />
        <h4 className="text-1xl">o inicia sesión Google</h4>
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
        <h4 className="text-1xl text-center  ">
          <span>¿Ya tienes cuenta?</span>
          <br />
          <span className=" opacity-50  hover:opacity-100 cursor-pointer">
            <Link href={"/login"}>Ingresas Aquí</Link>
          </span>
        </h4>
      </div>
    </>
  );
}
