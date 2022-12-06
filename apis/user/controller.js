const { generateToken } = require("../../helpers/generaterandonHelpers");
const AuthModal = require("./Models/AuthModal");
const authmodal = require("./Models/AuthModal");
const userSuccess = require("./res/userSuccess");
const userErrors = require("./res/userError");
const tag = "user-Controller";

const createUser = async ({ username, password, mobile, role, email }) => {
  try {
    let checked = await check({ email, modal: AuthModal });
    console.log(checked);
    if (checked) {
      return await updated(
        { email },
        { username, password, mobile, role, email },
        { modal: AuthModal }
      );
    }
    let payload = { username, password, mobile, role, email };

    return await created({ modal: AuthModal }, { values: payload });
  } catch (error) {
    console.log(`[${tag}]-createUser`, error);
    return { message: "internal server error", status: "error", code: 500 };
  }
};

const validateUser = async ({ email, password }) => {
  try {
    let checked = await get(email, AuthModal);

    if (checked && checked.password == password) {
      let token = generateToken(checked._id);
      let payload = { role: checked.role };
      let data = { token, payload };

      return { message: "successfull", data, status: "success", code: 200 };
    }

      throw new Error({message: "your not a authorized person", status: "error",code: 400})
  } catch (error) {
    console.log(`[${tag}]-validateUser`, error);
    return { message: "internal server error", status: "error", code: 500 };
  }
};

const getAllUsers = async ({ pageno, limit }) => {
  try {
    let alldata = await paginatedata({ modal: AuthModal, limit, pageno });

    let total = await count(AuthModal);

    if (alldata === null) return userErrors.notFound();
    let data = { user: alldata, total };
    return { message: "successfull", data, status: "success", code: 200 };
  } catch (error) {
    console.log(`[${tag}]-getAllUsers`, error);
    return { message: "internal server error", status: "error", code: 500 };
  }
};

let deleteUser = async (id) => {
  try {
    let deletes = await deleted({ id, modal: AuthModal });

    return { message: "successfull", deletes, status: "success", code: 200 };
  } catch (error) {
    console.log(`[${tag}]-deleteUser`, error);
    return { message: "internal server error", status: "error", code: 500 };
  }
};

let getUser = async ({ id }) => {
  try {
    let user = await authmodal.findById(id);

    if (user === null) return { message: "unable to update",status: "error", code: 400};

    return { message: "successfull", user, status: "success", code: 200 };
  } catch (error) {
    console.log(`[${tag}]-getUser`, error);
    return { message: "internal server error", status: "error", code: 500 };
  }
};

let userUpdate = async ({ id, data }) => {
  try {
    let updated = await authmodal.findById(id).update(data);

    if (updated === null) return { message: "unable to update",status: "error", code: 400};

    return { message: "successfull", updated, status: "success", code: 200 };
  } catch (error) {
    console.log(`[${tag}]-userUpdate`, error);
    return { message: "internal server error", status: "error", code: 500 };
  }
};

const setPassword = async ({ email, password }) => {
  try {
    let checked = await get(email, AuthModal);

    if (checked && checked.useredit === true) {
      let find = { email };
      let payload = { email, password, useredit: false };

      let user = await updated(
        { find },
        { values: payload },
        { modal: AuthModal }
      );

      return user;
    }
    return { message: "unable to update",status: "error", code: 400};
  } catch (error) {
    console.log(`[${tag}]-setPassword`, error);
    return { message: "internal server error", status: "error", code: 500 };
  }
};

//TODO helper functions
const check = async ({ email, modal }) => {
  try {
    let user = await modal.findOne({ email: email });

    if (user === null) return false;
    return true;
  } catch (error) {
    console.log(`[${tag}]-check`, error);
    return false;
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

let updated = async ({ find }, { values }, { modal }) => {
  try {
    console.log(find, values);
    let update = await modal.findOneAndUpdate(find, values);

    return userSuccess.UpdateSuccess({ data: update });
  } catch (error) {
    console.log(`[${tag}]-updated`, error);
  }
};

let created = async ({ modal }, { values }) => {
  try {
    console.log(values);
    let user = await modal.create(values);

    return userSuccess.Success({ data: user });
  } catch (error) {
    console.log(`[${tag}]-created`, error);
  }
};
let count = async (modal) => {
  try {
    let total = await modal.countDocuments();
    return total;
  } catch (error) {
    console.log(`[${tag}]-count`, error);
  }
};
let paginatedata = async ({ modal, limit, pageno }) => {
  try {
    let data = await modal
      .find()
      .skip(pageno * limit)
      .limit(limit);
    return data;
  } catch (error) {
    console.log(`[${tag}]-paginatedata`, error);
  }
};
const deleted = async ({ id, modal }) => {
  try {
    let deleteuser = await modal.findByIdAndDelete(id);
    return deleteuser;
  } catch (error) {
    console.log(`[${tag}]-deleted`, error);
    return;
  }
};

module.exports = {
  createUser,
  validateUser,
  getAllUsers,
  deleteUser,
  getUser,
  userUpdate,
  setPassword,
};
