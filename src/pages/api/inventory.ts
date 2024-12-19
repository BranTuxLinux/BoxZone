import { NextApiRequest, NextApiResponse } from "next";
import { match } from "ts-pattern";
import { Methods } from "@/pages/api";
import {
  DeleteInventory,
  GetInventory,
  GetInventoryByUser,
  GetInventoryByUserAndId,
  CreateInventory,
  UpdateInventory,
} from "@/backend/handlers/inventory";
import mongooseDB from "@/lib/mongoose";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongooseDB();
  const { id, userId } = req.query;
  console.log({ id });
  const method = (req.method as Methods) || "";
  match(method)
    .with(Methods.GET, () => {
      if (id && userId) return GetInventoryByUserAndId(req, res);
      if (userId) return GetInventoryByUser(req, res);
      return GetInventory(req, res);
    })
    .with(Methods.POST, () => CreateInventory(req, res))
    .with(Methods.PUT, () => UpdateInventory(req, res))
    .with(Methods.DELETE, () => DeleteInventory(req, res))
    .otherwise(() =>
      res.status(400).json({ success: false, message: "Method no allowed" })
    );
}
