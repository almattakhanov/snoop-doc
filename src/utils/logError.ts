import logger from '../config/winston';

/**
 * Функция для логирования ошибок с максимальной информацией
 * @param error Ошибка, которую нужно логировать
 * @param context Дополнительный контекст, который может быть полезен для отладки
 */
export function logError(error: unknown, context: string = 'Unknown context') {
  if (error instanceof Error) {
    // Логируем стандартные поля ошибки
    logger.error(`Error in ${context}: ${error.message}`, {
      stack: error.stack,
      name: error.name,
    });
  } else if (typeof error === 'object' && error !== null) {
    // Если ошибка — объект, логируем ее поля
    const errorDetails = Object.entries(error).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, unknown>,
    );

    logger.error(`Unknown object error in ${context}`, errorDetails);
  } else {
    // Если ошибка — примитивный тип (например, строка или число)
    logger.error(`Primitive error in ${context}`, { error });
  }
}
