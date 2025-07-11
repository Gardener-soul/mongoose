import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service';

const service = new CategoryService();

/* POST /api/categories */
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.create(req.body);       // name, description 등
    return res.status(201).json(data);
  } catch (err) {
    next(err);                                         // 전역 에러 핸들러로 위임
  }
};

/* GET /api/categories/:id 과연 효율적인가? */
export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.get(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not Found' });
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

/* GET /api/categories */
export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.list();
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

/* PATCH /api/categories/:id */
export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.update(req.params.id, req.body); 
    if (!data) return res.status(404).json({ message: 'Not Found' });
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

/* DELETE /api/categories/:id */
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.remove(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not Found' });
    return res.json({ deletedId: data._id });
  } catch (err) {
    next(err);
  }
};

export const findByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.findByName(req.params.name);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};  