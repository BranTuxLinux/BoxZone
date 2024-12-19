import { Schema, model, models, Document, Types, Model } from "mongoose";

export interface IInventory extends Document {
  name: string;
  userId: Types.ObjectId;
  items: Types.ObjectId[];
}

const InventorySchema = new Schema<IInventory>(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  { timestamps: true }
);

export const InventoryModel: Model<IInventory> =
  models.Inventory ||
  model<IInventory>("Inventory", InventorySchema, "Inventory");
