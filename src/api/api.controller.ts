import { Application, NextFunction, Request, Response } from "express";
import { userControllers } from "./users/user.controller";
import { authController } from "./auth/auth.controller";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import { ApiError } from "../utils/errors/api_error";

/**
 * Function to load api endpoint without using express routing
 * @param app Express Application
 */
export const loadApiEndpoints = (app: Application): void => {
  /**
   * Status endpoint 
   * @returns Response OK / Data status
   */
  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({ success: true, data: "Status OK" });
  });

  authController(app);
  userControllers(app);

  /**
   * Launches a 404 Error by default when dont found the especified poth
   */
  app.use((req: Request, res: Response, next: NextFunction) =>
    next(new ApiError(StatusCodes.NOT_FOUND, `La ruta ${req.path} no se ha localizado`))
  );
};
