import { Router } from "express";
import * as post from "../controllers/postController";
import * as tag from "../controllers/postController";

export const postRouter = Router();
export const tagRouter = Router();

// Tag Router
tagRouter.post("/", tag.createTag);

// Post Router
postRouter.post("/", post.createPost);
postRouter.get("/", post.getAllPosts);
postRouter.get("/:id", post.getPostById);
postRouter.put("/:id", post.updatePost);
postRouter.delete("/:id", post.deletePost);
postRouter.get("/author/:authorId", post.getPostsByAuthor);
postRouter.get("/category/:categoryId", post.getPostsByCategory);
postRouter.get("/tag/:tagName", post.getPostsByTag);
postRouter.patch("/:id/views", post.incrementPostViews);
postRouter.patch("/:id/likes", post.incrementPostLikes);

// Aggregation
postRouter.get("/analysis/popular", post.getPopularPostsAnalysis);
postRouter.get("/analysis/category-stats", post.getCategoryStatistics);
