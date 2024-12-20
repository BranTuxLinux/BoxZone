import mongoose, { Schema, Document, Model, model, models } from "mongoose";

// Interfaz genérica para documentos flexibles
export interface IFlexibleDocument extends Document {
  [key: string]: any; // Permite cualquier propiedad
}

// Esquema flexible
const FlexibleSchema = new Schema({}, { strict: false });

// Modelos

export const UsersGoogleModel : Model<IFlexibleDocument> = models?.users || model<IFlexibleDocument>('users',FlexibleSchema,'users')