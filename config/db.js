const { MONGO_ATLAS, ENV } = require("./index");
const { connect } = require("mongoose");
const connectDb = () => {
  if (ENV === "production") {
    connect(MONGO_ATLAS);
    console.log("mongo atlas connected");
  }
};
module.exports = { connectDb };
