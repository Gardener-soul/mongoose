import { Request, Response } from "express";
import { PostService } from "../services/post.service";

const postService = new PostService();

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await postService.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await postService.get(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllPosts = async (_: Request, res: Response) => {
  try {
    const posts = await postService.list();
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await postService.update(req.params.id, req.body);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await postService.remove(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getPostsByAuthor = async (req: Request, res: Response) => {
  try {
    const posts = await postService.findByAuthor(req.params.authorId);
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getPostsByCategory = async (req: Request, res: Response) => {
  try {
    const posts = await postService.findByCategory(req.params.categoryId);
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getPostsByTag = async (req: Request, res: Response) => {
  try {
    const posts = await postService.findByTag(req.params.tagName);
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const incrementPostViews = async (req: Request, res: Response) => {
  try {
    const post = await postService.incrementViews(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const incrementPostLikes = async (req: Request, res: Response) => {
  try {
    const post = await postService.incrementLikes(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// Aggregation 엔드포인트들
export const getPopularPostsAnalysis = async (_: Request, res: Response) => {
  try {
    const result = await postService.getPopularPostsAnalysis();
    res.json({
      message: "인기 게시글 분석 결과",
      data: result,
      count: result.length
    });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getCategoryStatistics = async (_: Request, res: Response) => {
  try {
    const result = await postService.getCategoryStatistics();
    res.json({
      message: "카테고리별 통계 분석 결과",
      data: result,
      count: result.length
    });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
