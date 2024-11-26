import { Schema, model, models, Document } from "mongoose";

export interface ITems extends Document {
  amount: number;
  pricing: number;
  Category_FK: Schema.Types.ObjectId;
  Inventory_FK: Schema.Types.ObjectId;
}

const ItemsSchema = new Schema<ITems>({
  amount: { type: Number, required: true },
  pricing: { type: Number, required: true },
  Category_FK: { type: Schema.Types.ObjectId, ref: "Category" },
  Inventory_FK: { type: Schema.Types.ObjectId, ref: "Inventory" },
});

export default models.Items || model<ITems>("Items", ItemsSchema, "Items");
