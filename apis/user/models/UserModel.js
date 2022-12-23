const { Schema, model } = require("mongoose");
const {} = require("validator");
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
    socketId: {
      type: Array,
      required: false,
    },
    isonline: {
      type: Boolean,
      default: false,
      required: false,
    },
    chatwith: {
      type: String,
      required: false,
    },
    profile:{
      type:String
    }
  },
  { timestamps: true, collection: "users" } // collation: "User"
);
module.exports = model("User", UserSchema);
