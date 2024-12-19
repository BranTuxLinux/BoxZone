import { NextApiRequest, NextApiResponse } from "next";
import { match } from "ts-pattern";
import { Methods } from "@/pages/api";

import mongooseDB from "@/lib/mongoose";
import {
  CreateCategory,
  DeleteCategory,
  GetCategory,
  GetCategoryByInventory,
  UpdateCategory,
} from "@/backend/handlers/category";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongooseDB();
  const { id, inventoryId } = req.query;
  console.log({ id });
  const method = (req.method as Methods) || "";
  match(method)
    .with(Methods.GET, () => {
      if (inventoryId) return GetCategoryByInventory(req, res);
      return GetCategory(req, res);
    })
    .with(Methods.POST, () => CreateCategory(req, res))
    .with(Methods.PUT, () => UpdateCategory(req, res))
    .with(Methods.DELETE, () => DeleteCategory(req, res))
    .otherwise(() =>
      res.status(400).json({ success: false, message: "Method no allowed" })
    );
}
