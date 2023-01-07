import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import app from "../app";
import { ApiError } from "../utils/errors/api_error";
/**
 * ErrorHandle class to apply at middleware
 */
export default class ErrorHandler {
  static handle = () => {
    return async (
      err: ApiError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if(!err) next()

      const status: number =
        err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      
      const body: any = {
        success: false,
        message: err.message || process.env.ERROR_DEFAULT_MESSAGE,
        fields: err.fields,
        status,
        stack: "",
      };

      if(app.get('env') == 'development') body.stack = err.stack

      res.status(status).json(body);
    };
  };
}
