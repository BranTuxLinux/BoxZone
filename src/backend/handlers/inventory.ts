import { Data } from "@/pages/api";
import { NextApiRequest, NextApiResponse } from "next";
import { IInventory, InventoryModel } from "../models/Inventory";
import { existsID } from "@/utils/utils";

type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<Data<IInventory[] | IInventory>>
) => Promise<void>;

export const GetInventory: ApiHandler = async (req, res) => {
  try {
    const inventory = await InventoryModel.find();
    return res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Error in Inventory" });
  }
};
// get inventory by user
export const GetInventoryByUser: ApiHandler = async (req, res) => {
  const { userId } = req.query;
  existsID(userId, res);
  try {
    const inventory = await InventoryModel.find({ userId }).populate("items");
    return res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Error in Inventory" });
  }
};
export const GetInventoryByUserAndId: ApiHandler = async (req, res) => {
  const { userId, id } = req.query;
  existsID(userId, res);
  try {
    const inventory = await InventoryModel.findOne({
      userId,
      _id: id,
    }).populate("items");
    return res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Error in Inventory" });
  }
};
export const CreateInventory: ApiHandler = async (req, res) => {
  const { name, userId } = req.body;
  try {
    const inventory = await InventoryModel.create({ name, userId });
    return res.status(201).json({ success: true, data: inventory });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Error in Inventory" });
  }
};
export const UpdateInventory: ApiHandler = async (req, res) => {
  const { id } = req.query;
  const { name } = req.body;
  existsID(id, res);
  try {
    const inventory = await InventoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    return res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Error in Inventory" });
  }
};

export const DeleteInventory: ApiHandler = async (req, res) => {
  const { id } = req.query;
  existsID(id, res);
  try {
    await InventoryModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Inventory deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Error in Inventory" });
  }
};
