"use server";
import { LoginSchema, RegisterSchema } from "@/lib/zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { z } from "zod";
import User, { IUser } from "@/backend/models/User";
import bcrypt from "bcryptjs";
import mongooseDB from "@/lib/mongoose";
export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  try {
    const { data, success } = RegisterSchema.safeParse(values);
    if (!success) return { error: "invalid data" };
    await mongooseDB()
    const userExist = await User.findOne({
      email: data.email,
    });
    if (userExist) return { error: "This User exist in db" };
    const pass = await bcrypt.hash(data.password, 10);
    const user: IUser = new User({
      name: data.name,
      email: data.email,
      password: pass,
      role: "user",
      company: "Copacabanazo",
    });
    await user.save();
    await signIn("credentials", {
      email: values.email,
      password: data.password,
      redirect: false,
    });
    return {success: true}
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};
export const LoginGoogle= async()=> {
  await signIn('google',{ redirectTo: "/" })
}