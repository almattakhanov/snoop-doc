import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError'; // Импортируем наш класс ошибок
import logger from '../config/winston';
import { HttpStatusCodes } from '../utils/HttpStatusCodes'; // Импорт логгера, если используется

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Проверяем, является ли ошибка экземпляром AppError
  const statusCode =
    err instanceof AppError
      ? err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR
      : HttpStatusCodes.INTERNAL_SERVER_ERROR;
  const errorMessage = err.message || 'Internal Server Error';
  const errorDetails = err instanceof AppError ? err.details : null;
  const errorCode = err instanceof AppError ? err.errorCode : 'UNKNOWN_ERROR';

  // Логирование ошибки
  logger.error({
    message: errorMessage,
    statusCode,
    stack: err.stack,
    path: req.path,
    method: req.method,
    details: errorDetails,
  });

  // Отправка ответа клиенту
  res.status(statusCode).json({
    success: false,
    error: errorMessage,
    code: errorCode,
    details: errorDetails,
  });
};
