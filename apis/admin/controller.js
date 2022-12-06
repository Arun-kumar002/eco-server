//!local module
const AdminModel = require("./Models/AdminModel");
const { generateToken } = require("../../helpers/generaterandonHelpers");
const errors = require("./res/adminError");
const success = require("./res/adminSuccess");
const tag = "admin Controller";
//!local ends

const validateAdmin = async ({ email, password }) => {
  try {
    let user = await fetchingExistingUser(email, AdminModel);

    if (user && user.password === password) {
      let token = generateToken(user._id);

      let payload = { role: user.role };
      let data = { payload, token };

      return { message: "successfull", data, status: "success", code: 200 };
    }
    return {
      message: "your not a authorized person",
      status: "error",
      code: 400,
    };
  } catch (error) {
    console.log(`[${tag}]-logincontroller`, error);
    return { message: "internal server error", status: "error", code: 500 };
  }
};

const addAdminUser = async ({ ...data }) => {
  try {
    let admins = await creatingNewAdminUser(
      { modal: AdminModel },
      { values: { ...data } }
    );

    return { message: "successfull", admins, status: "success", code: 200 };
  } catch (error) {
    console.log(`[${tag}]-admincontroller`, error);
    return { message: "internal server error", status: "error", code: 500 };
  }
};
//TODO helper funcions
let creatingNewAdminUser = async ({ modal }, { values }) => {
  try {
    let user = await modal.create(values);

    return { message: "successfull ", user, status: "success" };
  } catch (error) {
    console.log(`[${tag}]-created`, error);
  }
};
const fetchingExistingUser = async (email, modal) => {
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
  validateAdmin,
  addAdminUser,
};
