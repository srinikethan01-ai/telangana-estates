import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  title: string;
  location: string;
  price: string;
  description: string;
  type: string;
  status: string;
  imageUrl: string | null;
  createdAt: Date;
}

const PropertySchema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, default: "available" },
    imageUrl: { type: String, default: null },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export const Property = mongoose.model<IProperty>("Property", PropertySchema);
