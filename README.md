Snoop Doc — это сервис для генерации документов с использованием шаблонов и Carbone, а также взаимодействия с хранилищем MinIO.

---

## Требования

1. **Node.js** версии **v20.11.1** или выше.
2. Установленный **LibreOffice** (необходим для работы Carbone).
3. Доступ к MinIO и данные для подключения (`endpoint`, `accessKey`, `secretKey`, `bucket`).

---

## Установка и запуск

### 1. Клонирование проекта
```bash
1. git clone <repository_url>
2. Установка зависимостей
Используйте npm для установки всех зависимостей:
npm install
3. Настройка подключения к MinIO
В файле src/services/minioService.ts замените значения подключения на ваши данные:
endpoint: Адрес MinIO сервера.
accessKey: Ваш MinIO Access Key.
secretKey: Ваш MinIO Secret Key.
bucketName: Название bucket.
Если у вас нет этих данных, обратитесь к команде DBP.

Пример:
typescript
Copy code
const minioClient = new Client({
  endPoint: '<Ваш endpoint>',
  port: 9000,
  useSSL: true,
  accessKey: '<Ваш accessKey>',
  secretKey: '<Ваш secretKey>',
});
const BUCKET_NAME = '<Ваш bucketName>';
4. Запуск проекта
Для запуска проекта в режиме разработки:
yarn dev


Структура проекта

src
├── config
│   ├── swagger.ts           # Конфигурация Swagger для генерации документации API
│   ├── winston.ts           # Логирование с использованием Winston
│
├── controllers
│   ├── documentController.ts # Основная логика обработки запросов на генерацию документов
│
├── middlewares
│   ├── authMiddleware.ts     # Проверка авторизации (если потребуется)
│   ├── errorHandler.ts       # Глобальная обработка ошибок
│
├── routes
│   ├── v1
│   │   ├── documentRoutes.ts # Роутинг для работы с документами (версия API v1)
│
├── services
│   ├── carboneService.ts     # Генерация документов с использованием Carbone
│   ├── documentService.ts    # Вспомогательная логика для работы с документами
│   ├── fileService.ts        # Локальная работа с файлами (чтение, запись, удаление)
│   ├── minioService.ts       # Подключение и работа с MinIO (хранилище шаблонов)
│
├── types
│   ├── commonTypes.ts        # Общие типы, используемые в проекте
│
├── utils
│   ├── AppError.ts           # Кастомный класс для обработки ошибок
│   ├── delay.ts              # Утилита для задержек в промисах
│   ├── ErrorCodes.ts         # Коды ошибок для использования в API
│   ├── globalLimit.ts        # Управление параллельными задачами с использованием p-limit
│   ├── handleControllerError.ts # Утилита для обработки ошибок в контроллерах
│   ├── HttpStatusCodes.ts    # HTTP-коды статусов
│
├── app.ts                    # Инициализация приложения Express
├── server.ts                 # Точка входа в приложение



Функционал

Генерация документов:
Генерация PDF-документов на основе шаблонов с использованием Carbone.
Хранение шаблонов в MinIO.
Кэширование шаблонов локально для оптимизации.

Документация API:
Доступна по маршруту /api-docs после запуска.
После запуска приложения документация API доступна по адресу:
http://localhost:8080/api-docs

Логирование:
Все запросы и ошибки логируются с использованием Winston.

Поддержка
Если у вас возникли вопросы, обратитесь к команде Greenfront или посмотрите код проекта.

