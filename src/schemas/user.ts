import UserModel, { IUser } from "@/backend/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(4,"No puede ser menor a 4 caracteres").optional(),
    password:z.string().min(8, 'la contraseña No puede ser menor a 8 caracteres').optional(),
    company:z.string().optional()
})

export const userParser  = async (req: NextApiRequest, res: NextApiResponse) : Promise<IUser | void>=> {
    const parse = await userSchema.safeParse(req.body);
    if (!parse.success) {
      console.log(parse?.error?.errors);
      return res.status(400).json({success: false, message:'Parser Error'})
    }
    return new UserModel(parse.data ) ;
  };
  