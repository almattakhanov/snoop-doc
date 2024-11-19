import carbone from 'carbone';
import { downloadTemplateIfUpdated } from './templateService';

carbone.set({
  factories: 3,
  startFactory: true,
});

export const carbonateTemplate = async (
  templatePath: string,
  data: object,
): Promise<Buffer> => {
  const localFilePath = await downloadTemplateIfUpdated(templatePath);

  return new Promise<Buffer>((resolve, reject) => {
    carbone.render(localFilePath, data, { convertTo: 'pdf' }, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result as Buffer);
    });
  });
};
