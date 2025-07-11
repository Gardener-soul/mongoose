import { Schema, model, Document, Types } from 'mongoose';

export interface IComment extends Document {
  _id: Types.ObjectId;
  author: Types.ObjectId; // ref User
  content: string;
  createdAt: Date;
}

export const commentSchema = new Schema<IComment>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);
