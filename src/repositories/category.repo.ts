import { Error as MongooseError } from 'mongoose';

import { Category } from '../schema/index';
import { ICategory } from '../schema/category.model';
import { BaseRepository } from './base.repo';
import { DuplicateKeyError, ValidationFailedError } from '../errors/db.error';

export class CategoryRepository extends BaseRepository<ICategory> {
  constructor() {
    super(Category);
  }

  /** 필요 시 Repository 고유 쿼리 추가 가능 */
  async findByName(name: string) {
    return this.model.findOne({ name }).lean<ICategory>().exec();
  }

  /** Base 메서드 override → 에러 래핑 */
  override async create(data: Partial<ICategory>) {
    try {
      return await super.create(data);
    } catch (err) {
      if ((err as any).code === 11000) throw new DuplicateKeyError(err);
      if (err instanceof MongooseError.ValidationError) throw new ValidationFailedError(err);
      throw err;
    }
  }
}
