import mongoose from 'mongoose';
import { config } from 'dotenv';

config(); // .env 로드  dotenv가 process.env를 사용할 수 있도록 함.

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error', err);
    process.exit(1);
  }
};