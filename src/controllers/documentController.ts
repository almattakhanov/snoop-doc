import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';
import { HttpStatusCodes } from '../utils/HttpStatusCodes';
import { carbonateTemplate } from '../services/carboneService';
import { handleControllerError } from '../utils/handleControllerError';

export const generateDocument = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { templatePath, data } = req.body;

    if (!templatePath || !data) {
      throw new AppError({
        message: 'Template path or data must be provided',
        statusCode: HttpStatusCodes.BAD_REQUEST,
      });
    }

    const documentBytes = await carbonateTemplate(templatePath, data);

    res.setHeader('Content-Type', 'application/pdf');
    res.end(documentBytes);
  } catch (error) {
    handleControllerError(error, req, next);
  }
};
