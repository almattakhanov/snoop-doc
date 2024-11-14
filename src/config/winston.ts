import appRoot from 'app-root-path';
import winston from 'winston';

const transportOptions = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5 * 1024 * 1024, // 5MB
    maxFiles: 20,
  },
  errorFile: {
    level: 'error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5 * 1024 * 1024, // 5MB
    maxFiles: 100,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      winston.format.printf(({ timestamp, level, message, requestId }) => {
        return `${timestamp} [${requestId || 'N/A'}] [${level}]: ${message}`;
      }),
    ),
  },
};

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File(transportOptions.file),
    new winston.transports.File(transportOptions.errorFile),
    new winston.transports.Console(transportOptions.console),
  ],
  exitOnError: false,
});

export default logger;
