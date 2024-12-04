import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongoose";
import Items, { ITems } from "@/backend/models/Items";
import { match } from "ts-pattern";
// import { z } from "zod";
import { Data, Methods } from "../api";
import { ItemsSchema } from "@/schemas/items";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data<ITems[] | ITems>>
) {
  try {
    // Conectar a la base de datos
    await connectToDatabase();

    console.log(req.query);
    const method = req.method as Methods | undefined;
    match(method)
      .with(Methods.GET, async () => {
        const items = await Items.find().populate("Category_FK Inventory_FK");
        res.status(200).json({ success: true, data: items });
      })
      .with(Methods.POST, async () => {
        // Crear ítem
        const parse =  await ItemsSchema.safeParse(req.body);
        if (!parse.success) {
          console.log(parse.error.errors)
          return res.status(400).json({
            success: false,
            
          });
        }
        const data = parse.data
console.log("Paso...")
        const newItem = await Items.create(data)
        return res.status(201).json({ success: true, data: newItem });
      })
      .with(Methods.PUT, async () => {
        // Actualizar ítem
        const { id } = req.query;
        if (!id) {
          return res
            .status(400)
            .json({ success: false, message: "Missing item ID" });
        }
        const updatedItem = await Items.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updatedItem) {
          return res
            .status(404)
            .json({ success: false, message: "Item not found" });
        }
        res.status(200).json({ success: true, data: updatedItem });
      })
      .with(Methods.DELETE, async () => {
        // Eliminar ítem
        const { id } = req.query;
        if (!id) {
          return res
            .status(400)
            .json({ success: false, message: "Missing item ID" });
        }
        const deletedItem = await Items.findByIdAndDelete(id);
        if (!deletedItem) {
          return res
            .status(404)
            .json({ success: false, message: "Item not found" });
        }
        res.status(200).json({ success: true, data: deletedItem });
      })
      .otherwise(() => {
        // Método no permitido
        res.status(405).json({ success: false, message: "Method Not Allowed" });
      });
  } catch (error) {
    console.error("Error in Items API:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
