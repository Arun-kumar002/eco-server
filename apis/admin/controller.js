//!local module
const AdminModel = require("./Models/AdminModel");
const { generateToken } = require("../../helpers/generaterandonHelpers");
const errorResponse = require("../../utils/errorResponse");
const tag = "admin Controller";
//!local ends

const loginController = async (email, password) => {
  try {
    let user = await AdminModel.findOne({ email: email }).select("+password");
    if (user != null && user.password === password) {
      let token = generateToken(user._id);
      let payload = { role: user.role };

      return { message: "successfull", payload, token, status: "success" };
    }

    throw new errorResponse("login failed", 400);
  } catch (error) {
    console.log(`[${tag}]-logincontroller`, error);
    throw new errorResponse("unknown  error", 500);
  }
};

const adminController = async ({ ...data }) => {
  try {
    let admins = await AdminModel.create(data);
    return { message: "successful", admins, status: "success" };
  } catch (error) {
    console.log(`[${tag}]-admincontroller`, error);
    throw new errorResponse("unknown  error", 500);
  }
};

module.exports = {
  loginController,
  adminController,
};
