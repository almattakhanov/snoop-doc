// Путь для хранения локальных шаблонов
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import appRootPath from 'app-root-path';

const unlinkFile = promisify(fs.unlink);

// Путь к папке templates внутри корня проекта
export const TEMPLATES_DIR = path.join(appRootPath.toString(), 'templates');

// Создаём папку templates, если её нет
if (!fs.existsSync(TEMPLATES_DIR)) {
  fs.mkdirSync(TEMPLATES_DIR, { recursive: true });
}

// Создаёт директорию, если она не существует
export const ensureDirectoryExists = (filePath: string): void => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Функция для получения пути к локальному файлу
export const getLocalFilePath = (
  templatePath: string,
  newEtag: string,
): string => {
  const { dir, ext, name } = path.parse(templatePath);
  return path.join(TEMPLATES_DIR, dir, `${name}_${newEtag}${ext}`);
};

// Удалить старые версии шаблона
export const removeOldVersions = async (
  templateName: string,
  currentETag: string,
): Promise<void> => {
  const extension = path.extname(templateName);
  const baseName = path.basename(templateName, extension);

  const files = fs.readdirSync(TEMPLATES_DIR);

  for (const file of files) {
    if (
      file.startsWith(`${baseName}_`) &&
      file.endsWith(extension) &&
      !file.includes(currentETag)
    ) {
      const filePath = path.join(TEMPLATES_DIR, file);
      console.log(`Removing old version of template: ${filePath}`);
      await unlinkFile(filePath);
    }
  }
};
