const { Schema, model } = require("mongoose");
const CryptoJS = require("crypto-js");
const { PASSWORD_SECRET } = require("../../../config");

const AdminSchmema = new Schema(
  {
    userName:{
      type: String,
      default:'admin'
    },
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
    socketId: {
      type: Array,
      required: false,
    },
    isonline: {
      type: Boolean,
      default: false,
      required: false,
    },
    profile:{
      type:String,
      default:"https://avatars.dicebear.com/v2/avataaars/admin.svg?options[mood][]=happy"
    }
  },
  { timestamps: true, collection: "adminusers" } //collections
);

module.exports = model("AdminUser", AdminSchmema);
