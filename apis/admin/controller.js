//!local module
const AdminModel = require("./Models/AdminModel");
const { generateToken } = require("../../helpers/generaterandonHelpers");
const AdminErrors = require("./error/adminErrors");

//!local ends

exports.validate = async ({ email, password }) => {
  const user = await AdminModel.findOne({ email }).select("+password");
  if (!user) {
    throw new AdminErrors.AdminEntityNotFoundError();
  }

  if (user.password !== password) {
    throw new AdminErrors.AdminPasswordError();
  }

  const token = generateToken(user._id);

  return { token };
};

exports.create = async ({ email, password }) => {
  const user = await AdminModel.findOne({ email }).select("+password");
  if (user) {
    throw new AdminErrors.AdminExists();
  }

  return await AdminModel.create({ email, password });
};

exports.update = async ({ email, password }) => {
  let adminUser = await AdminModel.findOne({ email: email });

  if (adminUser) {
    let updated = adminUser.updateOne({ password: password });
    return updated;
  }

  throw new AdminErrors.AdminUpdateError();
};


exports.deleteAdminUserByEmail = async ({ email }) => {

  let adminUser = await AdminModel.findOne({ email: email });
  if (adminUser) {
    await AdminModel.deleteOne({ email });
    return;
  }

  throw new AdminErrors.UserDeleteError();
};

