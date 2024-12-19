import { Schema, model, models, Document, Types, Model } from "mongoose";
export interface ICategory extends Document {
  name: string;
  description?: string;
  inventoryId: Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String },
  inventoryId: {
    type: Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
});

export const CategoryModel: Model<ICategory> =
  models.Category || model<ICategory>("Category", CategorySchema, "Category");
