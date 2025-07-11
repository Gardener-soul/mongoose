import { Schema, Document, Types } from 'mongoose';

// User Document 타입 정의
export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
}

export const userSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  username: { type: String, required: true, trim: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
}, {timestamps: true});
