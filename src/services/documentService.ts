import { generateDocument } from './carboneService';
import logger from '../config/winston';

export const generatePdf = async (
  templatePath: string,
  data: object,
) => {
  try {
    return await generateDocument(templatePath, data);
  } catch (err) {
    logger.error('Error handling document generation request', err);
    throw err;
  }
};
