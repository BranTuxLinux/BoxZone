import { NextApiRequest, NextApiResponse } from "next";
import History from "@/backend/models/History";

// GET: Obtener todos los registros históricos
export const GetHistories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const histories = await History.find();
    res.status(200).json({ success: true, data: histories });
  } catch (error) {
    console.error("Error fetching histories:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// POST: Crear un registro histórico
export const PostHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { pricing, amount, state, OrderNumber } = req.body;
    if (!pricing || !amount || !state) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
    const newHistory = await History.create({ pricing, amount, state, OrderNumber });
    res.status(201).json({ success: true, data: newHistory });
  } catch (error) {
    console.error("Error creating history:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
