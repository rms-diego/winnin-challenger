import winston from "winston";

const { combine, timestamp, printf, colorize, align, json, errors } =
  winston.format;

const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({
    format: "YYYY-MM-DD hh:mm:ss.SSS A",
  }),
  align(),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  errors({ stack: true }),
);

const fileFormat = combine(
  timestamp({
    format: "YYYY-MM-DD hh:mm:ss.SSS A",
  }),
  align(),
  json(),
  errors({ stack: true }),
);

const logger = winston.createLogger({
  level: "info" || "log" || "warn" || "debug" || "error",
  format: combine(
    timestamp(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      filename: "local.log",
      level: "error",
      format: fileFormat,
    }),
  ],
});

export { logger };
