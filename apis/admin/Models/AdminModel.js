const { Schema, model } = require("mongoose");
const CryptoJS = require("crypto-js");
const { PASSWORD_SECRET } = require("../../../config");

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


AdminSchmema.pre("save", async function () {
  this.password = CryptoJS.AES.encrypt(this.password, PASSWORD_SECRET).toString();
});

AdminSchmema.methods.matchPassword = async function (enteredPassword) {

  let password=await CryptoJS.AES.decrypt(this.password, PASSWORD_SECRET).toString(
    CryptoJS.enc.Utf8
  );
  return enteredPassword==password
};


module.exports = model("AdminUser", AdminSchmema);
