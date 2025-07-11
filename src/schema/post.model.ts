import { Schema, model, Document, Types } from 'mongoose';

export interface ITag {
  tagName: string;
  tagDescription?: string;
}

export interface IPost extends Document { // Mongoose 모델에서 사용될 것을 나타냄.
  _id: Types.ObjectId;
  author: Types.ObjectId;
  categories: Types.ObjectId[];
  title: string;
  content: string;
  tags: ITag[]; // ITag의 요소들이 배열 형태로 저장됨.
  commentCount: number;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export const tagSubSchema = new Schema<ITag>(
  {
    tagName: { type: String, required: true, trim: true }, // 반드시 값이 있어야 하고, 앞뒤 공백을 제거함
    tagDescription: String,
  },
  { _id: false }, // 태그 자체에 대한 고유 아이디가 필요하지 않음, 독립적인 문서가 아니기 때문에.
);

export const postSchema = new Schema<IPost>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // ref를 통해 다른 모델과 연결함.
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }], // ref를 통해 카테고리 모델과 연결함.
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    tags: [tagSubSchema],
    commentCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }, // 타임스탬프 설정을 통해, createdAt, updatedAt 자동으로 관리해줌
);
