import { Router } from 'express';
import { getAverageAge } from '../../controllers/userController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/doc/generate-pdf:
 *   post:
 *     summary: Получение файла в формате pdf
 *     description: Получение файла с minio в формате pdf
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               template:
 *                 type: string
 *                 description: Путь к шаблону в minio
 *                 example: "incass/Form_Zayvlenine_Prisoedinenia_Incass_V3.docx"
 *               data:
 *                 type: object
 *                 description: Свойства объекта, которые нужно отобразить в шаблоне
 *                 additionalProperties: true
 *                 example:
 *                   client:
 *                     colvirId: "1452_4535826"
 *                     name: "Name"
 *                     department:
 *                       code: "AG8"
 *                       name: "Отделение №0802"
 *                   employee:
 *                     fullName: "fullName"
 *                     email: "email@gmail.com"
 *                   deaInfo:
 *                     deaName: "Договор на инкассирование"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *               description: PDF файл
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/doc/generate-pdf', authMiddleware,});


module.exports = router;
