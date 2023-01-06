import { Application, NextFunction, Request, Response } from "express";
import UserService from "./user.service";

export const userControllers = (app: Application): void => {
  app.get("/users", getUsers);
  app.put("/users/:id", updateUser);
  app.delete("/users/:id", deleteUser);
};

const userService = new UserService();

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAll();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await userService.update(req.params.id, req.body);
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await userService.destroy(req.params.id);
    if (!data) res.status(400).send();
    res.status(204).send(data);
  } catch (error) {
    next(error);
  }
};
