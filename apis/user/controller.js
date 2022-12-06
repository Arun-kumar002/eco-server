const { generateToken } = require("../../helpers/generaterandonHelpers");
const AuthModal = require("./Models/AuthModal");
const authmodal = require("./Models/AuthModal");
const errorResponse = require("../../utils/errorResponse");
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
    throw new errorResponse("unknown error", 500);
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
    
    throw new errorResponse("unauthorized user", 400);
  } catch (error) {
    console.log(`[${tag}]-loginController`, error);
    throw new errorResponse("unknown error", 500);
  }
};


const useralldatacontroller = async ({ pageno, limit }) => {
  try {
    let alldata = await authmodal
      .find()
      .skip(pageno * limit)
      .limit(limit);

    let total = await authmodal.countDocuments();

    if (alldata === null) throw new errorResponse("not found", 404);
    return {
      message: "successfull",
      user: alldata,
      total,
      status: "success",
    };
  } catch (error) {
    console.log(`[${tag}]-useralldatacontroller`, error);
    throw new errorResponse("unknown error", 500);
  }
};

let userdeletecontroller = async (id) => {
  try {
    let deleted = await authmodal.findByIdAndDelete(id);
    return { message: "USER_DELETE", deleted, status: "success" };
  } catch (error) {
    console.log(`[${tag}]-userdeletecontroller`, error);
    throw new errorResponse("unknown error", 500);
  }
};


let getindividualuser = async ({ id }) => {
  try {
    let user = await authmodal.findById(id);

    if (user === null) throw new errorResponse("not found", 404);
    return { message: "successfull", user: user, status: "success" };
  } catch (error) {
    console.log(`[${tag}]-getindividualuser`, error);
    throw new errorResponse("unknown error", 500);
  }
};


let induserupdatecontroller = async ({ id, data }) => {
  try {
    let updated = await authmodal.findById(id).update(data);

    if (updated === null) throw new errorResponse("not found", 404);

    return { message: "SUCCESSFUL", updated, status: "success" };
  } catch (error) {
    console.log(`[${tag}]-induserupdatecontroller`, error);
    throw new errorResponse("unknown error", 500);
  }
};


const newUserPasswordController = async ({ email, password }) => {
  try {
    let check = await AuthModal.findOne({ email: email });

    if (check != null && check.useredit === true) {
      let user = await AuthModal.findOneAndUpdate(
        { email: email },
        { password: password, useredit: false }
      );
      return { message: "SUCCESSFUL", user, status: "success" };
    }

    throw new errorResponse("your not a registered person", 400);
  } catch (error) {
    console.log(`[${tag}]-newUserPasswordController`, error);
    throw new errorResponse("unknown error", 500);
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
