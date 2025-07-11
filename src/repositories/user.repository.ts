import { BaseRepository } from "./base.repo";
import { IUser } from "../schema/user.model";
import { User } from "../schema";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }
} 