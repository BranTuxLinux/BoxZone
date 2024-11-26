import { Schema, model, models, Document } from "mongoose";

export interface IHistory extends Document {
  pricing: number;
  amount: number;
  state: "Modificado" | "Creado" | "Eliminado";
  OrderNumber?: number;
}

const historySchema = new Schema<IHistory>(
  {
    pricing: { type: Number, required: true },
    amount: { type: Number, required: true },
    state: {
      type: String,
      enum: ["modified", "created", "deleted"],
      required: true,
    },
    OrderNumber: { type: Number },
  },
  { timestamps: true }
);

export default models.History ||
  model<IHistory>("History", historySchema, "History");
