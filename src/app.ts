import express from 'express';
import userRoutes from './routes/v1/userRoutes';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

// Настройка Swagger
setupSwagger(app);

export default app;
