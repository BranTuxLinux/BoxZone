
import { Schema, model, models, Document, Model } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  company?: string;
  Inventory_FK?: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], required: true },
    company: { type: String },
    Inventory_FK: [{ type: Schema.Types.ObjectId, ref: "Inventory" }],
  },
  { timestamps: true }
);
const modelUser = models?.User
const UserModel: Model<IUser> = modelUser|| model<IUser>("User",userSchema,"User")

export default UserModel