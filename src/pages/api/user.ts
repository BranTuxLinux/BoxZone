import User from "@/backend/models/User";
import connectToDatabase from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Entro en pages");
  try {
    // Conectar a la base de datos
    await connectToDatabase();

    if (req.method === "GET") {
      // Manejo de solicitudes GET
      const users = await User.find({});
      const UsersGoogle = await mongoose.connection.db
        ?.collection("users")
        .find().toArray()
      
      return res.status(200).json({ success: true, data: users, google:UsersGoogle });
    } else if (req.method === "POST") {
      const data = req.body;

      if (!data.name || !data.email) {
        return res
          .status(400)
          .json({ success: false, message: "Name and Email are required" });
      }

      const newUser = await User.create(data);
      return res.status(201).json({ success: true, data: newUser });
    } else {
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
