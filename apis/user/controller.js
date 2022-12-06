const { generateToken } = require("../../helpers/generaterandonHelpers");
const AuthModal = require("./Models/AuthModal");
const authmodal = require("./Models/AuthModal");
const userSuccess = require("./res/userSuccess");
const userErrors = require("./res/userError");
const tag = "user-Controller";

const createUser = async ({ username, password, mobile, role, email }) => {
  let checked = await isUserExist({ email, modal: AuthModal });
  console.log(checked);
  if (checked) {
    return await updatingExistingUser(
      { email },
      { username, password, mobile, role, email },
      { modal: AuthModal }
    );
  }
  let payload = { username, password, mobile, role, email };

  return await creatingNewUser({ modal: AuthModal }, { values: payload });
};

const validateUser = async ({ email, password }) => {
  let checked = await fetchingExisingUser(email, AuthModal);

  if (checked && checked.password == password) {
    let token = generateToken(checked._id);
    let payload = { role: checked.role };
    let data = { token, payload };

    return { message: "successfull", data, status: "success", code: 200 };
  }

  throw new Error({
    message: "your not a authorized person",
    status: "error",
    code: 400,
  });
};

const getAllUsers = async ({ pageno, limit }) => {
  let alldata = await paginatedUserData({ modal: AuthModal, limit, pageno });

  let total = await countingDbDocuments(AuthModal);

  if (alldata === null) return userErrors.notFound();
  let data = { user: alldata, total };
  return { message: "successfull", data, status: "success", code: 200 };
};

let deleteUser = async (id) => {
  let deletes = await deletingExistingUser({ id, modal: AuthModal });

  return { message: "successfull", deletes, status: "success", code: 200 };
};

let getUser = async ({ id }) => {
  let user = await authmodal.findById(id);

  if (user === null)
    return { message: "unable to update", status: "error", code: 400 };

  return { message: "successfull", user, status: "success", code: 200 };
};

let userUpdate = async ({ id, data }) => {
  let updated = await authmodal.findById(id).update(data);

  if (updated === null)
    return { message: "unable to update", status: "error", code: 400 };

  return { message: "successfull", updated, status: "success", code: 200 };
};

const setPassword = async ({ email, password }) => {
  let checked = await fetchingExisingUser(email, AuthModal);

  if (checked && checked.useredit === true) {
    let find = { email };
    let payload = { email, password, useredit: false };

    let user = await updatingExistingUser(
      { find },
      { values: payload },
      { modal: AuthModal }
    );

    return user;
  }
  return { message: "unable to update", status: "error", code: 400 };
};

//TODO helper functions
const isUserExist = async ({ email, modal }) => {
  let user = await modal.findOne({ email: email });

  if (user === null) return false;
  return true;
};
const fetchingExisingUser = async (email, modal) => {
  let user = await modal.findOne({ email: email }).select("+password");

  if (user === null) return false;
  return user;
};

let updatingExistingUser = async ({ find }, { values }, { modal }) => {
  console.log(find, values);
  let update = await modal.findOneAndUpdate(find, values);

  return userSuccess.UpdateSuccess({ data: update });
};

let creatingNewUser = async ({ modal }, { values }) => {
  console.log(values);
  let user = await modal.create(values);

  return userSuccess.Success({ data: user });
};
let countingDbDocuments = async (modal) => {
  let total = await modal.countDocuments();
  return total;
};
let paginatedUserData = async ({ modal, limit, pageno }) => {
  let data = await modal
    .find()
    .skip(pageno * limit)
    .limit(limit);
  return data;
};
const deletingExistingUser = async ({ id, modal }) => {
  let deleteuser = await modal.findByIdAndDelete(id);
  return deleteuser;
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
