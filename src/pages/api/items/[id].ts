import { ByIdDeleteItems, ByIdItems, ByIdUpdateItems } from "@/backend/handlers/ItemsHandlers";
import { Methods } from "@/pages/api";
import { NextApiRequest, NextApiResponse } from "next";
import { match } from "ts-pattern";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const methods = req.method as Methods | undefined;
  match(methods)
    .with(Methods.GET, async () => ByIdItems(req,res))
    .with(Methods.PUT, async () => ByIdUpdateItems(req,res))
    .with(Methods.DELETE, async () => ByIdDeleteItems(req,res))
}
