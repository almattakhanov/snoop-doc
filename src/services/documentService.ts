import fs from 'fs';
import { downloadTemplateFromMinIO, getETagFromMinIO } from './minioService';
import { getLocalFilePath, removeOldVersions } from './fileService';
import logger from '../config/winston';

// Блокировка для управления одинаковыми шаблонами
const downloadLocks = new Map<string, Promise<string>>();

// Получить шаблон с блокировкой для одинаковых запросов
export const getTemplate = async (templatePath: string): Promise<string> => {
  if (downloadLocks.has(templatePath)) {
    logger.info(`Waiting for ongoing download: ${templatePath}`);
    return downloadLocks.get(templatePath)!;
  }

  const downloadPromise = (async () => {
    try {
      const etag = await getETagFromMinIO(templatePath);
      const localFilePath = getLocalFilePath(templatePath, etag);

      if (fs.existsSync(localFilePath)) {
        logger.info(`Using cached template: ${localFilePath}`);
        return localFilePath; // Файл уже скачан
      }

      logger.info(`Downloading updated template: ${templatePath}`);
      const downloadedPath = await downloadTemplateFromMinIO(
        templatePath,
        etag,
      );

      // Удаляем старые версии этого шаблона
      await removeOldVersions(templatePath, etag);

      return downloadedPath;
    } finally {
      downloadLocks.delete(templatePath); // Снимаем блокировку
    }
  })();

  downloadLocks.set(templatePath, downloadPromise);
  return downloadPromise;
};
