import User from "@/backend/models/User";
import connectToDatabase from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
type Data = {
    success: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    message?: string;
  };
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("Entro en pages")
  try {
    // Conectar a la base de datos
    await connectToDatabase();

    if (req.method === "GET") {
      // Manejo de solicitudes GET
      const users = await User.find({});
      return res.status(200).json({ success: true, data: users });
    } else if (req.method === "POST") {
      // Manejo de solicitudes POST
      const data = req.body;

      // Validar datos
      if (!data.name || !data.email) {
        return res.status(400).json({ success: false, message: "Name and Email are required" });
      }

      const newUser = await User.create(data);
      return res.status(201).json({ success: true, data: newUser });
    } else {
      // Manejo de métodos no soportados
      return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
