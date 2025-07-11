import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.get(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await userService.list();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.remove(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}; 

export const findByName = async (req: Request, res: Response) => {
  try {
    const user = await userService.findByName(req.params.name);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};