const { generateToken } = require("../../helpers/generaterandonHelpers");
const AuthModal = require("./Models/AuthModal");
const authmodal = require("./Models/AuthModal");
const tag = "user-Controller";

const registerController = async ({
  username,
  password,
  mobile,
  role,
  email,
}) => {
  try {
    let check = await authmodal.findOne({ email: email });
    if (check != null) {
      let update = await authmodal.findOneAndUpdate(
        { email: email },
        { username, password, mobile, role, email }
      );

      return {
        message: "email already is there details updates",
        status: "update",
        update,
      };
    }

    let user = await authmodal.create({
      username,
      password,
      mobile,
      role,
      email,
    });
    return { message: "successfull ", user, status: "success" };
  } catch (error) {
    console.log(`[${tag}]-registerController`, error);
    return { message: "unknown error", status: "error" };
  }
};

const loginController = async ({ email, password }) => {
  try {
    let user = await AuthModal.findOne({
      email: email,
    });
    if (user != null && user.password == password) {
      let token = generateToken(user._id);
      let payload = { role: user.role };
      return { message: "successful", payload, token, status: "success" };
    }

    return { message: "unauthorized user", status: "error" };
  } catch (error) {
    console.log(`[${tag}]-loginController`, error);
    return { message: "unknown error", status: "error" };
  }
};

const useralldatacontroller = async ({ pageno, limit }) => {
  try {
    let alldata = await authmodal
      .find()
      .skip(pageno * limit)
      .limit(limit);

    let total = await authmodal.countDocuments();

    let response =
      alldata === null
        ? { message: "not found", status: "error" }
        : {
            message: "successfull",
            user: alldata,
            total,
            status: "success",
          };

    return response;
  } catch (error) {
    console.log(`[${tag}]-useralldatacontroller`, error);
    return { message: "unknown error", status: "error" };
  }
};

let userdeletecontroller = async (id) => {
  try {
    let deleted = await authmodal.findByIdAndDelete(id);
    return { message: "USER_DELETE", deleted, status: "success" };
  } catch (error) {
    console.log(`[${tag}]-userdeletecontroller`, error);
    return { message: "unknown error", status: "error" };
  }
};

let getindividualuser = async ({ id }) => {
  try {
    let user = await authmodal.findById(id);

    let response =
      user !== null
        ? { message: "successfull", user: user, status: "success" }
        : { message: "unknown error", status: "erroe" };

    return response;
  } catch (error) {
    console.log(`[${tag}]-getindividualuser`, error);
    return { message: "unknown error", status: "error" };
  }
};

let induserupdatecontroller = async ({ id, data }) => {
  try {
    let updated = await authmodal.findById(id).update(data);

    let response =
      updated === null
        ? { message: "SOMETHING", status: "error" }
        : { message: "SUCCESSFUL", updated, status: "success" };
    return response;
  } catch (error) {
    console.log(`[${tag}]-induserupdatecontroller`, error);
    return { message: "unknown error", status: "error" };
  }
};

const newUserPasswordController = async ({ email, password }) => {
  try {
    let check = await AuthModal.findOne({ email: email });
    console.log("im");

    if (check != null && check.useredit === true) {
      let user = await AuthModal.findOneAndUpdate(
        { email: email },
        { password: password, useredit: false }
      );
      return { message: "SUCCESSFUL", user, status: "success" };
    }
    return { message: "your not a registered person", status: "error" };
  } catch (error) {
    console.log(`[${tag}]-newUserPasswordController`, error);
    return { message: "unknown error", status: "error" };
  }
};

module.exports = {
  useralldatacontroller,
  userdeletecontroller,
  getindividualuser,
  induserupdatecontroller,
  registerController,
  newUserPasswordController,
  loginController,
};
