
import ItemModel, { ITems } from "@/backend/models/Items";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

// Esquema para validar los datos del cuerpo de la solicitud (POST, PUT)
export const ItemsSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  pricing: z.number().min(0, "Pricing must be at least 0"),
  Category_FK: z.string().optional(),
  Inventory_FK: z.string().optional(),
});

export const QuerySchema = z.object({
  id: z.string().optional(),
});
export const ItemsParse  = async (req: NextApiRequest, res: NextApiResponse) : Promise<ITems | void>=> {
  const parse = await ItemsSchema.safeParse(req.body);
  if (!parse.success) {
    console.log(parse?.error?.errors);
    return res.status(400).json({success: false})
  }
  return new ItemModel(parse.data ) ;
};
