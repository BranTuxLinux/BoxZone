import { NextApiRequest, NextApiResponse } from "next";
import Items, { ITems } from "../models/Items";
import { Data } from "@/pages/api";
import { ItemsParse } from "@/schemas/items";
import { existsID } from "@/utils/utils";

type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<Data<ITems[] | ITems>>
) => Promise<void>;

export const GetItems: ApiHandler = async (req, res) => {
  const items = await Items.find().populate("Category_FK Inventory_FK");
  return res.status(200).json({ success: true, data: items });
};

export const PostItems: ApiHandler = async (req, res) => {
  const data = await ItemsParse(req, res);
  if (!data) return;

  const existItems = await Items.findOne({
    pricing: data.pricing,
  });

  if (existItems) {
    const cal = existItems.amount + data.amount;
    console.log(cal);
    const modifiedItems = await Items.updateOne(
      {
        pricing: existItems.pricing,
      },
      {
        $set: { amount: cal },
      }
    );
    if (modifiedItems.modifiedCount > 0) {
      console.log("Item actualizado correctamente.");
      return res.status(200).json({ success: true });
    } else {
      console.log("No se realizó ninguna modificación.");
      return res.status(400).json({
        success: false,
        message: "No se realizó ninguna modificación",
      });
    }
  }
  const newItem = await Items.create(data);
  return res.status(201).json({ success: true, data: newItem });
};
// #region ByID
export const ByIdItems: ApiHandler = async (req, res) => {
  const { id } = req.query;
  await existsID(id, res);
  const data = await Items.findById(id);
  console.log(data);
  return res.status(200).json({ success: true, data, message: "Item found" });
};

export const ByIdUpdateItems: ApiHandler = async (req, res) => {
  const { id } = req.query;
  await existsID(id, res);
  try {
    const data = await ItemsParse(req, res);
    if (!data) return;
    console.log(data);
    const itemsUpdated = await Items.findByIdAndUpdate(
      id,
      {
        $set: {
          pricing: data.pricing,
          amount: data.amount,
          Category_FK: data.Category_FK,
        },
      },
      { new: true }
    );
    console.log(itemsUpdated);
    if (!itemsUpdated) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    return res.status(200).json({ success: true, data: itemsUpdated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error Items" });
  }
};
export const ByIdDeleteItems: ApiHandler = async (req, res) => {
  const { id } = req.query;
  await existsID(id, res);
  try {
    const data = await Items.findByIdAndDelete(id);

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
  }
};

// #endregion
export const asd = () => {};
