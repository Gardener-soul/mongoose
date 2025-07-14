import { Router } from 'express';
import * as ctrl from '../controllers/categoryController';

export const categoryRouter = Router();

categoryRouter.post('/', ctrl.create);
categoryRouter.get('/', ctrl.list);
categoryRouter.get('/:id', ctrl.get);
categoryRouter.patch('/:id', ctrl.update);
categoryRouter.delete('/:id', ctrl.remove);
categoryRouter.get('/:name', ctrl.findByName);
