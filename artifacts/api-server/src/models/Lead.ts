import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  fullName: string;
  phone: string;
  status: string;
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: "new" },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export const Lead = mongoose.model<ILead>("Lead", LeadSchema);
