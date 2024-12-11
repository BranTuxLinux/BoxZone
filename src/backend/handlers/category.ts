import { NextApiRequest, NextApiResponse } from "next";
import Category from "@/backend/models/Category";

// GET: Obtener todas las categorías
export const GetCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await Category.find().populate("inventory_FK");
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// POST: Crear una categoría
export const PostCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, inventory_FK } = req.body;
    if (!name || !inventory_FK) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
    const newCategory = await Category.create({ name, inventory_FK });
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
