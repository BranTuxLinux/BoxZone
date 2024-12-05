import { NextApiRequest, NextApiResponse } from "next";
import Items, { ITems } from "../models/Items";
import { Data } from "@/pages/api";
import { ItemsParse } from "@/schemas/items";

type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<Data<ITems[] | ITems>>
) => Promise<void>;

export const 

GetItems = async (req: NextApiRequest, res: NextApiResponse) => {
  const items = await Items.find().populate("Category_FK Inventory_FK");
  return res.status(200).json({ success: true, data: items });
};

export const PostItems: ApiHandler = async (req, res) => {
 
  const data = await ItemsParse(req,res)
  if(!data) return 

  const existItems = await Items.findOne({
    pricing: data.pricing,
  });

  if (existItems) {
    const cal = existItems.amount + data.amount;
    console.log(cal)
    const modifiedItems = await Items.updateOne(
      {
        pricing: existItems.pricing,
      },
      {
        $set: { amount: cal },
      }
    );
    if (modifiedItems.modifiedCount > 0) {
      console.log('Item actualizado correctamente.');
      return res.status(200).json({ success: true });
    } else {
      console.log('No se realizó ninguna modificación.');
      return res.status(400).json({ success: false, message: 'No se realizó ninguna modificación' });
    }
    
  }
  const newItem = await Items.create(data);
  return res.status(201).json({ success: true, data: newItem });
};
