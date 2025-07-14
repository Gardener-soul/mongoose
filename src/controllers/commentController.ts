import { Request, Response } from "express";
import { CommentService } from "../services/comment.service";
import { Post } from "../schema";

const commentService = new CommentService();

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = await commentService.create(req.body);
    // 댓글 생성 후, 해당 Post의 comments 배열에 댓글 ID 추가
    if (comment && comment.post) {
      await Post.findByIdAndUpdate(
        comment.post,
        { $push: { comments: comment._id } }
      );
    }
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await commentService.get(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllComments = async (_: Request, res: Response) => {
  try {
    const comments = await commentService.list();
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await commentService.update(req.params.id, req.body);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await commentService.remove(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getCommentsByAuthor = async (req: Request, res: Response) => {
  try {
    const comments = await commentService.findByAuthor(req.params.authorId);
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const comments = await commentService.findByPost(req.params.postId);
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
