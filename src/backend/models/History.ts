import { Schema, model, models, Document, Model, Types } from "mongoose";

export interface IHistory extends Document {
  inventoryId: Types.ObjectId;
  itemId: Types.ObjectId;
  actionType: 'create' | 'update' | 'delete';
  changes?: Record<string, unknown>;
  timestamp: Date;
}

const HistorySchema = new Schema<IHistory>({
  inventoryId: { type: Schema.Types.ObjectId, ref: 'Inventory', required: true },
  itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  actionType: { type: String, enum: ['create', 'update', 'delete'], required: true },
  changes: { type: Object },
  timestamp: { type: Date, default: Date.now },
});

export const HistoryModel :Model<IHistory> = models.History || model<IHistory>('History', HistorySchema, "History");

