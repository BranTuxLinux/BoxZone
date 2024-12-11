import { Schema, model, models, Document, Model } from "mongoose";

export interface Inventory extends Document {
  name: string;
}

const InventorySchema = new Schema<Inventory>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const ModelInventory: Model<Inventory> =
  models.Inventory ||
  model<Inventory>("Inventory", InventorySchema, "Inventory");
export default ModelInventory;
