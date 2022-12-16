const winston = require("winston");
require('winston-mongodb')
const { MONGO_ATLAS, MONGO_LOCAL } = require("../../config/index");

const logFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    return `${timestamp}:${level}:${stack || message}`;
  }
);

const devLogger = () => {
  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.errors({ stack: true }),
      logFormat
    ),
    defaultMeta: { service: "[user-service]:" },
    transports: [new winston.transports.Console()],
  });
  return logger;
};

const productLogger = () => {
  const logger = winston.createLogger({
    defaultMeta: { service: "[user-service]:" },
    transports: [
      new winston.transports.File({
        filename: "infoAuditLogs.log",
        level: "info",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
      new winston.transports.MongoDB({
        level: "error",
        db: MONGO_ATLAS,
        options:{useUnifiedTopology:true},
        collection: "AuditLogs",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
    ],
  });
  return logger;
};

module.exports = { devLogger, productLogger };
