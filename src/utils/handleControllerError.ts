import { NextFunction, Request } from 'express';
import AppError from '../utils/AppError';
import { HttpStatusCodes } from '../utils/HttpStatusCodes';
import { ErrorCodes } from '../utils/ErrorCodes';

export const handleControllerError = (
  error: unknown,
  req: Request,
  next: NextFunction,
): void => {
  if (error instanceof AppError) {
    if (error.details?.templatePath) {
      error.details.templatePath = req.body?.templatePath || '';
    }
    next(error);
  } else {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error message';
    const appError = new AppError({
      message: errorMessage,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      details: {
        templatePath: req.body?.templatePath || '',
        originalError: errorMessage,
      },
      errorCode: ErrorCodes.TEMPLATE_PROCESSING_ERROR,
    });
    next(appError);
  }
};
