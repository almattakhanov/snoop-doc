import fs from 'fs';
import path from 'path';
import { Client } from 'minio';
import {
  ensureDirectoryExists,
  getLocalFilePath,
  TEMPLATES_DIR,
} from './fileService';

// Настройка MinIO клиента
const minioClient = new Client({
  endPoint: process.env.END_POINT || '',
  useSSL: true,
  accessKey: process.env.ACCESS_KEY || '',
  secretKey: process.env.SECRET_KEY || '',
});

const BUCKET_NAME = process.env.BUCKET_NAME || '';



// Получить ETag из MinIO
const getETagFromMinIO = async (templatePath: string): Promise<string> => {
  try {
    const { etag } = await minioClient.statObject(BUCKET_NAME, templatePath);
    return etag;
  } catch (error) {
    throw error;
  }
};

// Скачивание шаблона из MinIO
const downloadTemplateFromMinIO = async (
  templatePath: string,
  newEtag: string,
): Promise<string> => {
  const tempFilePath = path.join(TEMPLATES_DIR, `tmp_${newEtag}`);
  const localFilePath = getLocalFilePath(templatePath, newEtag);

  return new Promise((resolve, reject) => {
    minioClient
      .getObject(BUCKET_NAME, templatePath)
      .then((dataStream) => {
        const fileStream = fs.createWriteStream(tempFilePath);

        dataStream.pipe(fileStream);

        dataStream.on('end', async () => {
          try {
            ensureDirectoryExists(localFilePath);
            fs.renameSync(tempFilePath, localFilePath); // Переименовываем файл
            resolve(localFilePath);
          } catch (renameError) {
            reject(renameError);
          }
        });

        dataStream.on('error', async (error) => {
          try {
            fs.unlinkSync(tempFilePath); // Удаляем временный файл в случае ошибки
          } catch {}
          reject(error);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { getETagFromMinIO, downloadTemplateFromMinIO };
