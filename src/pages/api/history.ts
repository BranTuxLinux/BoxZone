import { NextApiRequest, NextApiResponse } from "next";
import { match } from "ts-pattern";
import { Methods } from "@/pages/api";

import mongooseDB from "@/lib/mongoose";
import { GetHistory, GetHistoryByInventory } from "@/backend/handlers/History";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { inventoryId } = req.query;
  await mongooseDB();
  const method = (req.method as Methods) || "";
  match(method)
    .with(Methods.GET, () => {
        if (inventoryId) return GetHistoryByInventory(req, res);
        return GetHistory(req,res)
    })

    .otherwise(() =>
      res.status(400).json({ success: false, message: "Method no allowed" })
    );
}
