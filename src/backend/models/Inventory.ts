import { Schema, model, models, Document } from "mongoose";

export interface Inventory extends Document {
  name: string;
}

const InventorySchema = new Schema<Inventory>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Items ||
  model<Inventory>("Inventory", InventorySchema, "Inventory");
