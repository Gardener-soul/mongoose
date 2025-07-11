import { Router } from "express";
import * as user from "../controllers/userController";

export const userRouter = Router();

userRouter.post("/", user.createUser);
userRouter.get("/", user.getAllUsers);
userRouter.get("/:id", user.getUserById);
userRouter.put("/:id", user.updateUser);
userRouter.delete("/:id", user.deleteUser);
userRouter.get("/name/:name", user.findByName);
