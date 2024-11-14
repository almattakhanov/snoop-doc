import carbone from 'carbone';
import logger from '../config/winston';
import { downloadTemplateIfUpdated } from './templateService';

carbone.set({
  factories: 3,
  startFactory: true,
});

export const generateDocument = async (
  templatePath: string,
  data: object,
  options = { convertTo: 'pdf' },
) => {
  const localFilePath = await downloadTemplateIfUpdated(templatePath);

  return new Promise<Buffer>((resolve, reject) => {
    carbone.render(localFilePath, data, options, (err, result) => {
      if (err) {
        logger.error('Carbone rendering error', err);
        return reject(err);
      }
      resolve(result);
    });
  });
};
