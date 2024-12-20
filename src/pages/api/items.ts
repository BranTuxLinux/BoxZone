import { NextApiRequest, NextApiResponse } from "next";
import { match } from "ts-pattern";
import { Methods } from "@/pages/api";

import mongooseDB from "@/lib/mongoose";
import { CreateItem, DeleteItem, GetItems, GetItemsByInventory, UpdateItem } from "@/backend/handlers/Items";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongooseDB();
  const { id, inventoryId, categoryId } = req.query;
  
  const method = (req.method as Methods) || "";
  match(method)
    .with(Methods.GET, () => {
     if(inventoryId)return GetItemsByInventory(req,res) 
      GetItems(req,res)
    })
    .with(Methods.POST, () => CreateItem(req,res))
    .with(Methods.PUT, ()=> UpdateItem(req,res))
    .with(Methods.DELETE, ()=> DeleteItem(req,res))
    .otherwise(() =>
      res.status(400).json({ success: false, message: "Method no allowed" })
    );
}
