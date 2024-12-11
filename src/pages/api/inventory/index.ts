import { DeleteInventory, GetInventories, PostInventory } from "@/backend/handlers/inventory";
import { NextApiRequest, NextApiResponse } from "next";

import { match } from "ts-pattern";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  match(req.method)
    .with("GET", () => GetInventories(req, res))
    .with("POST", () => PostInventory(req, res))
    .with("DELETE", () => DeleteInventory(req, res))
    .otherwise(() => {
      res.status(405).json({ success: false, message: "Method Not Allowed" });
    });
}
