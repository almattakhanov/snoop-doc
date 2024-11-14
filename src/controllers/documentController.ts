import { Request, Response } from 'express';
import { generatePdf } from '../services/documentService';
import { logError } from '../utils/logError';
import { ResponseError } from '../types/commonTypes';

export const generateDocument = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { templatePath, data } = req.body;

    if (!templatePath || !data) {
      const err: ResponseError = {
        error: 'Missing required fields: templatePath, data',
      };
      res.status(400).send(err);
      return;
    }

    const documentBytes = await generatePdf(templatePath, data);

    res.setHeader('Content-Type', 'application/pdf');
    res.end(documentBytes);
  } catch (error: unknown) {
    logError(error, 'generateDocument controller');
    const err: ResponseError = {
      error: 'Failed to generate document',
    };
    res.status(500).send({ error: err });
  }
};
