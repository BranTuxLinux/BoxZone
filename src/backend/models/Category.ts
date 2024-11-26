import { Schema, model, models, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  inventory_FK: Schema.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  inventory_FK: { type: Schema.Types.ObjectId, ref: "Inventory" },
});

export default models.Category ||
  model<ICategory>("Category", categorySchema, "Category");
