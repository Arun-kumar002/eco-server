require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  MONGO_LOCAL: process.env.MONGO_LOCAL,
  MONGO_ATLAS: process.env.MONGO_ATLAS,
  JWT_SECRET: process.env.JWT_SECRET,
  PASSPORT_SECRET: process.env.PASSPORT_SECRET,
  ENV:process.env.ENV
};
