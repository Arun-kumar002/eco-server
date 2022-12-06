//!local module
const AdminModel = require("./Models/AdminModel");
const { generateToken } = require("../../helpers/generaterandonHelpers");
const errors = require("./res/adminError");
const success = require("./res/adminSuccess");

const tag = "admin Controller";
//!local ends

const validateAdmin = async ({ email, password, res }) => {
  try {
    let user = await get(email, AdminModel);

    if (user && user.password !== password) {
      res.status(400).json({
        message: "your not a authorized person",
        status: "error",
        code: 400,
      });
    }

    let token = generateToken(user._id);
    let payload = { role: user.role };
    let data = { payload, token };

    res
      .status(200)
      .json({ message: "successfull", data, status: "success", code: 200 });
      
  } catch (error) {
    console.log(`[${tag}]-validateAdmin`, error);
    res
      .status(500)
      .json({ message: "internal server error", status: "error", code: 500 });
  }
};

const addAdminUser = async ({ ...data }) => {
  try {
    let admin = await created({ modal: AdminModel }, { values: { ...data } });

    return {
      message: "successfull",
      data: admin,
      status: "success",
      code: 200,
    };
  } catch (error) {
    console.log(`[${tag}]-addAdminUser`, error);
    return { message: "internal server error", status: "error", code: 500 };
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
  validateAdmin,
  addAdminUser,
};
