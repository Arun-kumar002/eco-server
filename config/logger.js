const winston = require("winston");
require("winston-mongodb");
const { ENV, MONGO_ATLAS } = require("./index");

let logger = winston.createLogger({
  defaultMeta: { service: "[user-service]:" },
  transports: [
    new winston.transports.File({
      filename: "infoAuditLog.log",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.MongoDB({
      level: "error",
      db: MONGO_ATLAS,
      options: { useUnifiedTopology: true },
      collection: "AuditLogs",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

module.exports = logger;
