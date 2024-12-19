import { Schema, model, models, Document, Model } from "mongoose";

export interface IItem extends Document {
  quantity: number;
  price: number;
  categoryId?: Schema.Types.ObjectId;
  inventoryId: Schema.Types.ObjectId;
}

const ItemSchema = new Schema<IItem>({
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  inventoryId: { type: Schema.Types.ObjectId, ref: 'Inventory', required: true },
});
export const ItemModel: Model<IItem> = models?.Item || model<IItem>('Item', ItemSchema, "Items");

