import { Application, NextFunction, Request, Response } from "express";
import { userControllers } from "./users/user.controller";
import { authController } from "./auth/auth.controller";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import { ApiError } from "../utils/errors/api_error";

export const loadApiEndpoints = (app: Application): void => {
  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({ success: true, data: "Status OK" });
  });

  authController(app);
  userControllers(app);

  app.use((req: Request, res: Response, next: NextFunction) =>
    next(new ApiError(StatusCodes.NOT_FOUND, `La ruta ${req.path} no se ha localizado`))
  );
};
