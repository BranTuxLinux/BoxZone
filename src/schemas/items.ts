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
