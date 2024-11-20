import pLimit from 'p-limit';

export const globalLimit = pLimit(3); // Ограничиваем до 3 параллельных задач
