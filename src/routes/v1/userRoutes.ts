// src/routes/userRoutes.ts

import { Router } from 'express';
import { getAverageAge } from '../../controllers/userController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/users/average-age:
 *   get:
 *     summary: Получение среднего возраста пользователей
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Успешный ответ с JSON, содержащим средний возраст
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageAge:
 *                   type: number
 *       401:
 *         description: Unauthorized - Токен не предоставлен
 *       403:
 *         description: Forbidden - Недействительный токен
 */
router.get('/users/average-age', authMiddleware, getAverageAge);

export default router;
