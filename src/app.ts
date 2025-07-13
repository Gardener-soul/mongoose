import express, { Request, Response, NextFunction } from 'express';
import { categoryRouter } from './routes/category.route';
import { userRouter } from './routes/user.route';
import { postRouter } from './routes/post.route';
import { commentRouter } from './routes/comment.route';

export const createApp = () => {
  const app = express();

  app.use(express.json());

  // 기본 라우트
  app.get('/', (_, res) => res.send('Hello Express + TS + Mongoose!'));
  app.use('/api/categories', categoryRouter);
  app.use('/api/users', userRouter);
  app.use('/api/posts', postRouter);
  app.use('/api/comments', commentRouter);

  // 에러 핸들러
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: err.message });
  });

  return app;
};
