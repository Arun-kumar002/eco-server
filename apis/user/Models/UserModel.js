const { Schema, model } = require("mongoose");
const {}=require('validator')
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
  { timestamps: true, collection: "users" } // collation: "User"
);
module.exports = model("User", UserSchema);
