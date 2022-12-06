//!local module
const AdminModel = require("./Models/AdminModel");
const { generateToken } = require("../../helpers/generaterandonHelpers");
const errors = require("./res/adminError");
const success = require("./res/adminSuccess");

const tag = "admin Controller";
//!local ends

const loginController = async (email, password) => {
  try {
    let user = await get(email, AdminModel);

    if (user && user.password === password) {
      let token = generateToken(user._id);
      let payload = { role: user.role };
      let data = { payload, token };
      return success.Success({ data: data });
    }
    return errors.unauthorized();
  } catch (error) {
    console.log(`[${tag}]-logincontroller`, error);
    return errors.internalError();
  }
};

const adminController = async ({ ...data }) => {
  try {
    let admins = await created({ modal: AdminModel }, { values: { ...data } });

    return success.Success({ data: admins });
  } catch (error) {
    console.log(`[${tag}]-admincontroller`, error);
    return errors.internalError();
  }
};

//TODO helper funcions
let created = async ({ modal }, { values }) => {
  try {
    console.log(values);
    let user = await modal.create(values);

    return { message: "successfull ", user, status: "success" };
  } catch (error) {
    console.log(`[${tag}]-created`, error);
  }
};
const get = async (email, modal) => {
  try {
    let user = await modal.findOne({ email: email }).select("+password");
    if (user === null) return false;
    return user;
  } catch (error) {
    console.log(`[${tag}]-check`, error);
    return false;
  }
};
module.exports = {
  loginController,
  adminController,
};
