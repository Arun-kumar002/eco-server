const { connect } = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MONGO_ATLAS, ENV, MONGO_LOCAL } = require("./index");
const logger = require("./logger");
const connectDb = async () => {
  try {
    if (ENV === "production") {
      await connect(MONGO_ATLAS);
      console.log("mongo atlas connected");
    }
    if (ENV === "testing") {
      const mongoServer = await MongoMemoryServer.create();
      const mongoUrl = await mongoServer.getUri();
      console.log("mongo testing db connected", mongoUrl);
      await connect(mongoUrl);
    }
    if (ENV === "development") {
      await connect(MONGO_LOCAL);
      console.log("mongo local connected");
    }
  } catch (error) {
    logger.error(error);
  }
};
module.exports = { connectDb };
