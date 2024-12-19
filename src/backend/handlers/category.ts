import { Data } from "@/pages/api";
import { NextApiRequest, NextApiResponse } from "next";
import { CategoryModel, ICategory } from "../models/Category";
import { ItemModel } from "../models/Items";

type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<Data<ICategory[] | ICategory>>
) => Promise<void>;

export const GetCategory: ApiHandler = async (req, res) => {
  try {
    const category = await CategoryModel.find();
    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in Category" });
  }
};

export const GetCategoryByInventory: ApiHandler = async (req, res) => {
  const { inventoryId } = req.query;
  try {
    const category = await CategoryModel.find({ inventoryId });
    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in Category" });
  }
};

export const CreateCategory: ApiHandler = async (req, res) => {
  const { name, description, inventoryId } = req.body;
  try {
    const category = await CategoryModel.create({
      name,
      description,
      inventoryId,
    });
    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in Category" });
  }
};

export const UpdateCategory: ApiHandler = async (req, res) => {
  const { id } = req.query;
  const { name, description, inventoryId } = req.body;
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, description, inventoryId },
      { new: true }
    );
    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in Category" });
  }
};

export const DeleteCategory: ApiHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const categoryUsed = await ItemModel.findOne({ categoryId: id });
    if (categoryUsed) {
      return res
        .status(400)
        .json({ success: false, message: "Category is used in Items" });
    }
    await CategoryModel.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in Category" });
  }
};
