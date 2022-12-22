const winston = require("winston");
require("winston-mongodb");
const { ENV, MONGO_ATLAS } = require("./index");

let logger = winston.createLogger({
  defaultMeta: { service: "[user-service]:" },
  transports: [
    new winston.transports.File({
      filename: "infoLog.log",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        // winston.format.printf((info)=>{
        //   return `${info.timestamp}-[${info.level}]-${info.message} `
        // }),
        winston.format.align()
      ),
    }),
    new winston.transports.File({
      filename: "errorLog.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    // new winston.transports.MongoDB({
    //   level: "error",
    //   db: MONGO_ATLAS,
    //   options: { useUnifiedTopology: true },
    //   collection: "ErrorLogs",
    //   format: winston.format.combine(
    //     winston.format.label({ label: "userService" }),
    //     winston.format.timestamp(),
    //     winston.format.json()
    //   ),
    // }),
    // new winston.transports.MongoDB({
    //   level: "debug",
    //   db: MONGO_ATLAS,
    //   options: { useUnifiedTopology: true },
    //   collection: "InfoLogs",
    //   format: winston.format.combine(
    //     winston.format.label({ label: "userService" }),
    //     winston.format.timestamp(),
    //     winston.format.json()
    //   ),
    // }),
  ],
});

module.exports = logger;
