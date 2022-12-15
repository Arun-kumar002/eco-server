//!local module
const AdminModel = require("./Models/AdminModel");
const { generateToken } = require("../../helpers/generaterandonHelpers");
const AdminErrors = require("./error/adminErrors");



exports.validate = async ({ email, password }) => {
  const user = await AdminModel.findOne({ email }).select("+password");
  if (!user) {
    throw new AdminErrors.EntityNotFoundError();
  }
  let validate=await user.matchPassword(password)

  if (validate==false) {
    throw new AdminErrors.CredentialsMissmatchError();
  }

  const token = generateToken(user._id);

  return { token:token,admin:user };
};

exports.create = async ({ email, password }) => {
  const user = await AdminModel.findOne({ email }).select("+password");
  if (user) {
    throw new AdminErrors.EntityExistsError();
  }

  return await AdminModel.create({ email, password });
};

exports.update = async ({ email, password }) => {

  let adminUser = await AdminModel.findOne({ email: email });

  if (adminUser === null) {
    throw new AdminErrors.EntityNotFoundError();
  }

  let updated = adminUser.updateOne({ password:password }, { new: true });
  return updated;
};

exports.deleteAdminUserByEmail = async ({ email }) => {
  let adminUser = await AdminModel.findOne({ email: email });

  if (adminUser) {
    await AdminModel.deleteOne({ email });
    return;
  }

  throw new AdminErrors.EntityNotFoundError();
};
