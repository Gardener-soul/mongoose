import { UserRepository } from "../repositories/user.repo";
import { IUser } from "../schema/user.model";

export class UserService {
    constructor(private readonly repo: UserRepository = new UserRepository()) {}

    create(dto: Partial<IUser>) {
      return this.repo.create(dto);
    }
  
    get(id: string) {
      return this.repo.findById(id);
    }
  
    list() {
      return this.repo.findAll();
    }
  
    update(id: string, dto: Partial<IUser>) {
      return this.repo.updateById(id, { $set: dto });
    }
  
    remove(id: string) {
      return this.repo.deleteById(id);
    }
  
    findByName(name: string) {
      return this.repo.findByName(name);
    }
}
