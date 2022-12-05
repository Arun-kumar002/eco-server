const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require:true
    },
    email: {
      type: String,
      require:true

    },
    mobile: {
      type: String,
      require:true

    },
    password: {
      type: String,
      // select:false
    },
    useredit: {
      type: Boolean,
      default: true,
      require: false,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);
module.exports = model("auth1", UserSchema);
