import { Application, NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";

export const authController = (app: Application): void => {
  app.post("/login", login)
  app.post("/register", register)
};

const authService = new AuthService()

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.login(req.body);
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.register(req.body);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
