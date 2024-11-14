import fs from 'fs';
import path from 'path';
import logger from '../config/winston';
import { statObjectWithRetry, downloadFileWithRetry } from './minioService';

const templatesDir = path.join(process.cwd(), 'templates');
if (!fs.existsSync(templatesDir))
  fs.mkdirSync(templatesDir, { recursive: true });

const downloadPromises: { [key: string]: Promise<string> } = {};

const generateFilePath = (templatePath: string, etag: string) => {
  const { dir, name, ext } = path.parse(templatePath);
  const fileName = `${name}_etag_${etag}${ext}`;
  return path.join(dir, fileName);
};

const deleteOldFiles = async (templatePath: string, newEtag: string) => {
  const { name, dir } = path.parse(templatePath);
  const files = await fs.promises.readdir(dir);

  for (const file of files) {
    if (file.startsWith(`${name}_etag_`) && !file.includes(newEtag)) {
      const oldFilePath = path.join(dir, file);
      await fs.promises.unlink(oldFilePath);
      logger.info(`Deleted old file version: ${file}`);
    }
  }
};

export const downloadTemplateIfUpdated = async (templatePath: string) => {
  if (!downloadPromises[templatePath]) {
    downloadPromises[templatePath] = (async () => {
      const stat = await statObjectWithRetry(templatePath);
      const remoteEtag = stat.etag;
      const localFilePath = generateFilePath(templatePath, remoteEtag);

      if (fs.existsSync(localFilePath)) {
        logger.info(`Using cached template: ${localFilePath}`);
        return localFilePath;
      }

      await downloadFileWithRetry(templatePath, localFilePath);
      logger.info(`Downloaded new template version to: ${localFilePath}`);
      await deleteOldFiles(templatePath, remoteEtag);

      return localFilePath;
    })();
  }
  return downloadPromises[templatePath];
};
