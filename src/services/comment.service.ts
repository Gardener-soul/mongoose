import { CommentRepository } from "../repositories/comment.repo";
import { IComment } from "../schema/comment.model";

export class CommentService {
    constructor(private readonly repo: CommentRepository = new CommentRepository()) {}

    create(dto: Partial<IComment>) {
      return this.repo.create(dto);
    }
  
    get(id: string) {
      return this.repo.findById(id);
    }
  
    list() {
      return this.repo.findAll();
    }
  
    update(id: string, dto: Partial<IComment>) {
      return this.repo.updateById(id, { $set: dto });
    }
  
    remove(id: string) {
      return this.repo.deleteById(id);
    }

    findByAuthor(authorId: string) {
      return this.repo.findByAuthor(authorId);
    }

    findByPost(postId: string) {
      return this.repo.findByPost(postId);
    }
}
