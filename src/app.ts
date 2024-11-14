import express from 'express';
import documentRoutes from './routes/v1/documentRoutes';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(express.json());
app.use('/api/v1/documents', documentRoutes);

// Настройка Swagger
setupSwagger(app);

export default app;
