import { Router } from "express";
import * as comment from "../controllers/commentController";

export const commentRouter = Router();

commentRouter.post("/", comment.createComment);
commentRouter.get("/", comment.getAllComments);
commentRouter.get("/:id", comment.getCommentById);
commentRouter.put("/:id", comment.updateComment);
commentRouter.delete("/:id", comment.deleteComment);
commentRouter.get("/author/:authorId", comment.getCommentsByAuthor);
commentRouter.get("/post/:postId", comment.getCommentsByPost);
