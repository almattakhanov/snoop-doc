FROM registry-gitlab.bcc.kz/omni-channel-front/helpers/node-libreoffice:latest-new

# Папка приложения
ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Установка зависимостей
COPY package.json package-lock.json ./
RUN npm install --production

# Установка PM2
RUN npm install -g pm2

# Копирование всех исходных файлов проекта
COPY . .

# Сборка проекта
RUN npm run build

# Уведомление о порте, который будет прослушивать приложение
EXPOSE 8080

# Настройка папки для PM2
RUN mkdir /.pm2 && \
    chgrp -R 0 /.pm2 && \
    chmod -R g=u /.pm2 && \
    chmod 777 /.pm2

# Запуск приложения с PM2
CMD ["pm2-runtime", "dist/server.js"]
