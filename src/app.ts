import express from 'express';
import documentRoutes from './routes/v1/documentRoutes';
import { setupSwagger } from './config/swagger';
import { errorHandler } from './middlewares/errorHandler';
import AppError from './utils/AppError';
import { HttpStatusCodes } from './utils/HttpStatusCodes';
import { ErrorCodes } from './utils/ErrorCodes';

const app = express();

// Middleware для обработки JSON
app.use(express.json());

// Настройка Swagger
setupSwagger(app);

// Подключение маршрутов
app.use('/api/v1/documents', documentRoutes);

// Обработка неизвестных маршрутов
app.use((req, res, next) => {
  next(
    new AppError({
      message: ErrorCodes.ROUTE_NOT_FOUND,
      statusCode: HttpStatusCodes.NOT_FOUND,
    }),
  );
});

// Подключение обработчика ошибок
app.use(errorHandler);

export default app;
