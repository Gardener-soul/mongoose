import { createApp } from './app';
import { connectDB } from './config/db';
import { config } from 'dotenv';

config();
const PORT = process.env.PORT;

(async () => {
  await connectDB();
  const app = createApp();
  app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
})();
