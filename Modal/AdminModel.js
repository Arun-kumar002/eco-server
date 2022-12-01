const { Schema, model } = require("mongoose");

const AdminSchmema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "admin",
      require: false,
    },
  },
  { timestamps: true }
);

module.exports = model("ecoadmin", AdminSchmema);
