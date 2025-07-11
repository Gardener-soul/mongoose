import { Schema, Document, Types } from 'mongoose';

export interface ICategory extends Document {
  _id: Types.ObjectId; 
  name: string;
  description?: string; // description은 필수가 아닌 경우 ? 사용
}

export const categorySchema = new Schema<ICategory>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true, unique: true, trim: true },
  description: String,
}, {timestamps: true});
