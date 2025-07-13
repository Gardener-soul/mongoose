import { BaseRepository } from "./base.repo";
import { IComment } from "../schema/comment.model";
import { Comment } from "../schema";

export class CommentRepository extends BaseRepository<IComment> {
  constructor() {
    super(Comment);
  }

  async findByAuthor(authorId: string) {
    return this.model.find({ author: authorId }).lean<IComment>().exec();
  }

  async findByPost(postId: string) {
    return this.model.find({ post: postId }).lean<IComment>().exec();
  }
}
