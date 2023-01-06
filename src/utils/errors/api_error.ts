export class ApiError extends Error {
  statusCode: number;
  rawErrors: [] | undefined;
  fields: [] | undefined
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
