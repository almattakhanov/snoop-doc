import { HttpStatusCodes } from './HttpStatusCodes';
import { ErrorCodes } from './ErrorCodes';

class AppError extends Error {
  public statusCode?: number; // HTTP-статус ошибки
  public details?: any; // Дополнительные данные об ошибке
  public errorCode?: string; // Код ошибки

  constructor(error: {
    message: string;
    statusCode?: number;
    details?: any;
    errorCode?: string;
  }) {
    super(error.message);
    this.statusCode = error.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    this.details = error.details || {};
    this.errorCode = error.errorCode || ErrorCodes.INTERNAL_ERROR;

    // Захватываем стек вызовов
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
