import { BaseRepository } from "./base.repo";
import { IPost } from "../schema/post.model";
import { Post } from "../schema";

export class PostRepository extends BaseRepository<IPost> {
  constructor() {
    super(Post);
  }

  async findByAuthor(authorId: string) {
   // 그 결과를 Mongoose 문서가 아닌 일반 JavaScript 객체로 받고, 
   // 이 작업을 비동기적으로 실행하여 그 결과를 Promise로 반환하라는 의미
    return this.model.find({ author: authorId }).lean<IPost>().exec();
  }

  async findByCategory(categoryId: string) {
    return this.model.find({ categories: categoryId }).lean<IPost>().exec();
  }

  async findByTag(tagName: string) {
    return this.model.find({ "tags.tagName": tagName }).lean<IPost>().exec();
  }

  async incrementViews(postId: string) {
    return this.model.findByIdAndUpdate(
      postId,
      { $inc: { views: 1 } },
      { new: true }
    ).exec();
  }

  async incrementLikes(postId: string) {
    return this.model.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    ).exec();
  }

  async incrementCommentCount(postId: string) {
    return this.model.findByIdAndUpdate(
      postId,
      { $inc: { commentCount: 1 } },
      { new: true }
    ).exec();
  }

  // Aggregation 메서드 1: 인기 게시글 분석
  async getPopularPostsAnalysis() {
    return this.model.aggregate([
      // 1단계: 기본 필터링 (조회수나 좋아요가 있는 게시글만)
      {
        $match: {
          $or: [
            { views: { $gt: 0 } },
            { likes: { $gt: 0 } }
          ]
        }
      },
      // 2단계: 인기도 점수 계산
      {
        $addFields: {
          popularityScore: {
            $add: [
              { $multiply: ["$views", 0.3] },
              { $multiply: ["$likes", 0.5] },
              { $multiply: ["$commentCount", 0.2] }
            ]
          },
          // 태그 개수 계산
          tagCount: { $size: "$tags" },
          // 제목 길이 계산
          titleLength: { $strLenCP: "$title" }
        }
      },
      // 3단계: 인기도 점수로 정렬
      {
        $sort: { popularityScore: -1 }
      },
      // 4단계: 상위 10개만 선택
      {
        $limit: 10
      },
      // 5단계: 결과 포맷팅
      {
        $project: {
          _id: 1,
          title: 1,
          author: 1,
          views: 1,
          likes: 1,
          commentCount: 1,
          popularityScore: 1,
          tagCount: 1,
          titleLength: 1,
          createdAt: 1
        }
      }
    ]).exec();
  }

  // Aggregation 메서드 2: 카테고리별 통계 분석
  async getCategoryStatistics() {
    return this.model.aggregate([
      // 1단계: 카테고리가 있는 게시글만 필터링
      {
        $match: {
          categories: { $exists: true, $ne: [] }
        }
      },
      // 2단계: 카테고리 배열을 개별 문서로 분해
      {
        $unwind: "$categories"
      },
      // 3단계: 카테고리별로 그룹화
      {
        $group: {
          _id: "$categories",
          totalPosts: { $sum: 1 },
          totalViews: { $sum: "$views" },
          totalLikes: { $sum: "$likes" },
          totalComments: { $sum: "$commentCount" },
          avgViews: { $avg: "$views" },
          avgLikes: { $avg: "$likes" },
          avgComments: { $avg: "$commentCount" },
          // 최고 조회수 게시글 정보
          maxViews: { $max: "$views" },
          // 최근 게시글 정보
          latestPost: { $max: "$createdAt" }
        }
      },
      // 4단계: 카테고리 정보 조인
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      // 5단계: 카테고리 정보 정리
      {
        $addFields: {
          categoryName: { $arrayElemAt: ["$categoryInfo.name", 0] },
          categoryDescription: { $arrayElemAt: ["$categoryInfo.description", 0] }
        }
      },
      // 6단계: 최종 결과 정렬 (총 게시글 수 기준)
      {
        $sort: { totalPosts: -1 }
      },
      // 7단계: 결과 포맷팅
      {
        $project: {
          _id: 1,
          categoryName: 1,
          categoryDescription: 1,
          totalPosts: 1,
          totalViews: 1,
          totalLikes: 1,
          totalComments: 1,
          avgViews: 1,
          avgLikes: 1,
          avgComments: 1,
          maxViews: 1,
          latestPost: 1
        }
      }
    ]).exec();
  }
}