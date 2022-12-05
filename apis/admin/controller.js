//!local module
const AdminModel = require("./Models/AdminModel");
const tag = "admin Controller";
const { generateToken } = require("../../helpers/generaterandonHelpers");
//!local ends
const loginController = async (email, password) => {
  try {
    let user = await AdminModel.findOne({ email: email }).select("+password");
    console.log(user, "user");
    if (user != null && user.password === password) {
      let token = generateToken(user._id);
      let payload = { role: user.role };

      return { message: "successfull", payload, token, status: "success" };
    }

    return { message: "not admin", status: "error" };
  } catch (error) {
    console.log(`[${tag}]-logincontroller`, error);
    return { message: "unknown error", status: "error" };
  }
};

const adminController = async ({ ...data }) => {
  try {
    let admins = await adminModal.create(data);
    return { message: "successful", admins, status: "success" };
  } catch (error) {
    console.log(`[${tag}]-admincontroller`, error);
    return { message: "unsuccessfull", status: "error" };
  }
};

module.exports = {
  loginController,
  adminController,
};
