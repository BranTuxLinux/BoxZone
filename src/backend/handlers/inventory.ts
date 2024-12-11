import ModelInventory, { Inventory } from "@/backend/models/Inventory";
import mongooseDB from "@/lib/mongoose";
import { Data } from "@/pages/api";
import { NextApiRequest, NextApiResponse } from "next";


type ApiHandler = (
    req: NextApiRequest,
    res: NextApiResponse<Data<Inventory[] | Inventory>>
  ) => Promise<void>;
  
// GET: Obtener todos los inventarios
export const GetInventories:ApiHandler = async (req, res) => {
  try {
    await mongooseDB()
    const inventories = await ModelInventory.find();
    res.status(200).json({ success: true, data: inventories });
  } catch (error) {
    console.error("Error fetching inventories:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// POST: Crear un nuevo inventario
export const PostInventory: ApiHandler = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    const newInventory = await ModelInventory.create({ name });
    res.status(201).json({ success: true, data: newInventory });
  } catch (error) {
    console.error("Error creating inventory:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// DELETE: Eliminar un inventario
export const DeleteInventory : ApiHandler= async (req, res) => {
  try {
    const { id } = req.query;
    const deletedInventory = await ModelInventory.findByIdAndDelete(id);
    if (!deletedInventory) {
      return res.status(404).json({ success: false, message: "Inventory not found" });
    }
    res.status(200).json({ success: true, data: deletedInventory });
  } catch (error) {
    console.error("Error deleting inventory:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
