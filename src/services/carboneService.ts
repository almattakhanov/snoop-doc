import carbone from 'carbone';
import { getTemplate } from './documentService';
import { globalLimit } from '../utils/globalLimit';

carbone.set({
  factories: 3,
  startFactory: true,
});

// Генерация документа с Carbone
const generatePdf = async (
  templateName: string,
  data: object,
): Promise<Buffer> => {
  return globalLimit(async () => {
    const templatePath = await getTemplate(templateName);

    return new Promise((resolve, reject) => {
      carbone.render(
        templatePath,
        data,
        { convertTo: 'pdf' },
        (err, result) => {
          if (err) return reject(err);
          resolve(result as Buffer);
        },
      );
    });
  });
};

export { generatePdf };
