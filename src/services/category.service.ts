import { CategoryRepository } from '../repositories/category.repo';
import { ICategory } from '../schema/category.model';

export class CategoryService {
  constructor(private readonly repo: CategoryRepository = new CategoryRepository()) {}

  create(dto: Partial<ICategory>) {
    return this.repo.create(dto);
  }

  get(id: string) {
    return this.repo.findById(id);
  }

  list() {
    return this.repo.findAll();
  }

  update(id: string, dto: Partial<ICategory>) {
    return this.repo.updateById(id, { $set: dto });
  }

  remove(id: string) {
    return this.repo.deleteById(id);
  }

  findByName(name: string) {
    return this.repo.findByName(name);
  }
}
