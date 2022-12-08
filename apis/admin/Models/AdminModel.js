const { Schema, model } = require("mongoose");

const AdminSchmema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      require: true,
      enum: ["admin"],
    },
  },
  { timestamps: true,collection:'adminusers' }   //collections
);

module.exports = model("AdminUser", AdminSchmema);
