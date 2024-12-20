import { NextApiRequest, NextApiResponse } from "next";
import { IItem, ItemModel } from "../models/Items";
import { Data } from "@/pages/api";
import { HistoryModel } from "../models/History";
import { Types } from "mongoose";
import { InventoryModel } from "../models/Inventory";

type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<Data<IItem[] | IItem>>
) => Promise<void>;

export const GetItems: ApiHandler = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ success: false, message: "Error in Items" });
  }
};
export const GetItemsByInventory: ApiHandler = async (req, res) => {
  const { inventoryId } = req.query;
  try {
    const items = await ItemModel.find({ inventoryId }).populate("categoryId");
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ success: false, message: "Error in Items" });
  }
};

// create a new item
interface IHistory extends Document {
  inventoryId: Types.ObjectId;
  itemId: Types.ObjectId;
  actionType: "create" | "update" | "delete";
  changes?: Record<string, unknown>;
  timestamp: Date;
}

export const CreateItem: ApiHandler = async (req, res) => {
  try {
    const body = req.body as IItem;
    // si el item ya existe, se actualiza la cantidad siempre y cuando el precio y el inventario sean iguales
    const existItem = await ItemModel.findOne({
      price: body.price,
      inventoryId: body.inventoryId,
    });

    const updateItem = await existItem?.updateOne({
      $inc: { quantity: body.quantity },
      new: true,
    });

    if (updateItem) {
      await HistoryModel.create({
        inventoryId: body.inventoryId,
        itemId: updateItem._id,
        actionType: "update",
        changes: body,
        timestamp: new Date(),
      });
      return res.status(200).json({ success: true, data: existItem });
    }
    const item = new ItemModel(body);
    await item.save();
    await HistoryModel.create({
      inventoryId: body.inventoryId,
      itemId: item._id,
      actionType: "create",
      changes: body,
      timestamp: new Date(),
    });
    await InventoryModel.findByIdAndUpdate(body.inventoryId, {
      $push: { items: item._id },
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ success: false, message: "Error in Items" });
  }
};
// update an item
export const UpdateItem: ApiHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const body = req.body as IItem;
    const item = await ItemModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    await HistoryModel.create({
      inventoryId: item.inventoryId,
      itemId: item._id,
      actionType: "update",
      changes: body,
      timestamp: new Date(),
    });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ success: false, message: "Error in Items" });
  }
};
// delete an item
export const DeleteItem: ApiHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const item = await ItemModel.findByIdAndDelete({ _id: id });
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    await HistoryModel.create({
      inventoryId: item.inventoryId,
      itemId: item._id,
      actionType: "delete",
      timestamp: new Date(),
    });
    await InventoryModel.findByIdAndUpdate(item.inventoryId, {
      $pull: { items: item._id },
    });
    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ success: false, message: "Error in Items" });
  }
};
