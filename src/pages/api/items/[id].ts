import ItemModel from "@/backend/models/Items";
import { Methods } from "@/pages/api";
import { ItemsParse } from "@/schemas/items";
import { NextApiRequest, NextApiResponse } from "next";
import { match } from "ts-pattern";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const methods = req.method as Methods | undefined;
  match(methods)
    .with(Methods.GET, async () => {
      const data = await ItemModel.findById(id);
      console.log(data);
      res.status(200).json({ message: "GOOD", data });
    })
    .with(Methods.PUT, async () => {
      try {
        const data = await ItemsParse(req, res);
        if (!data) return;
        console.log(data)
        const itemsUpdated = await ItemModel.findByIdAndUpdate(
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
        console.log(itemsUpdated)
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
    });
}
