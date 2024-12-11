import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongoose";
import { ITems } from "@/backend/models/Items";
import { match } from "ts-pattern";
// import { z } from "zod";
import { Data, Methods } from "../../api";
import { GetItems, PostItems } from "@/backend/handlers/ItemsHandlers";

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
      .with(Methods.GET, () => GetItems(req, res))
      .with(Methods.POST, async () => PostItems(req,res))
      
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
