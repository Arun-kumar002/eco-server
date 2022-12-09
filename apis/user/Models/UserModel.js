const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    mobile: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      select: false,
    },
    promptPasswordChange: {
      type: Boolean,
      default: true,
      require: false,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true,collection:'users'}  // collation: "User" 
);
module.exports = model("User", UserSchema);
