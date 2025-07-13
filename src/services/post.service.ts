import { PostRepository } from "../repositories/post.repo";
import { IPost } from "../schema/post.model";

export class PostService {
    constructor(private readonly repo: PostRepository = new PostRepository()) {}

    // data transfer object, Partial<IPost>는 IPost의 부분적인 타입
    create(dto: Partial<IPost>) {
      return this.repo.create(dto);
    }
  
    get(id: string) {
      return this.repo.findById(id);
    }
  
    list() {
      return this.repo.findAll();
    }
  
    update(id: string, dto: Partial<IPost>) {
      return this.repo.updateById(id, { $set: dto });
    }
  
    remove(id: string) {
      return this.repo.deleteById(id);
    }

    findByAuthor(authorId: string) {
      return this.repo.findByAuthor(authorId);
    }

    findByCategory(categoryId: string) {
      return this.repo.findByCategory(categoryId);
    }

    findByTag(tagName: string) {
      return this.repo.findByTag(tagName);
    }

    incrementViews(postId: string) {
      return this.repo.incrementViews(postId);
    }

    incrementLikes(postId: string) {
      return this.repo.incrementLikes(postId);
    }

    incrementCommentCount(postId: string) {
      return this.repo.incrementCommentCount(postId);
    }

    // Aggregation 메서드들
    getPopularPostsAnalysis() {
      return this.repo.getPopularPostsAnalysis();
    }

    getCategoryStatistics() {
      return this.repo.getCategoryStatistics();
    }

}
