import Minio from 'minio';
import logger from '../config/winston';
import delay from '../utils/delay';

const minioClient = new Minio.Client({
  endPoint: process.env.END_POINT || '',
  useSSL: true,
  accessKey: process.env.ACCESS_KEY || '',
  secretKey: process.env.SECRET_KEY || '',
});

const BUCKET_NAME = process.env.BUCKET_NAME || '';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const statObjectWithRetry = async (templatePath: string) => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await minioClient.statObject(BUCKET_NAME, templatePath);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '';
      logger.error(
        `Error during statObject. Attempt ${attempt} of ${MAX_RETRIES} for templatePath ${templatePath}. ${errorMessage}`,
      );
      if (attempt < MAX_RETRIES) await delay(RETRY_DELAY);
      else throw err;
    }
  }
};

export const downloadFileWithRetry = async (
  templatePath: string,
  localFilePath: string,
) => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await new Promise<void>((resolve, reject) => {
        minioClient.fGetObject(
          BUCKET_NAME,
          templatePath,
          localFilePath,
          (err) => {
            if (err) return reject(err);
            resolve();
          },
        );
      });
    } catch (err) {
      logger.error(
        `Error during download. Attempt ${attempt} of ${MAX_RETRIES}. ${err.message}`,
      );
      if (attempt < MAX_RETRIES) await delay(RETRY_DELAY);
      else throw err;
    }
  }
};
