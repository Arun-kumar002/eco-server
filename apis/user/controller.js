const { default: mongoose } = require("mongoose");
const { generateToken } = require("../../helpers/generaterandonHelpers");
const UserModel = require("./Models/UserModal");
const UserErrors = require("./error/userErrors");

exports.create = async ({ userName, password, mobile, role, email }) => {
  let existsUser = await UserModel.findOne({ email: email });

  if (existsUser) {
    throw new UserErrors.UserExistsError();
  }

  let user = await UserModel.create({
    userName,
    password,
    mobile,
    role,
    email,
  });
  return { user: user };
};

exports.validate = async ({ email, password }) => {
  const user = await UserModel.findOne({ email }).select("+password");

  if (user === null) {
    throw new UserErrors.UserNotFoundError();
  }

  if (user.password !== password) {
    throw new UserErrors.UserPasswordError();
  }

  const token = generateToken(user._id);

  return { token: token };
};
exports.getAll = async ({ skip, limit, getCount, name, email }) => {
  let query = {};

  if (name) {
    query.userName = { $regex: name };
  }

  if (email) {
    query.email = email;
  }
  let count = undefined;
  if (getCount == true) {
    count = await UserModel.count(query);
  }
  const users = await UserModel.find(query)
    .skip(skip * limit)
    .limit(limit);

  return { users: users || [], count: count };
};

exports.deleteById = async (id) => {
  const deleteuser = await UserModel.findByIdAndDelete(id);

  if (deleteuser === null) {
    throw new UserErrors.UserDeleteError();
  }

  return deleteuser;
};

exports.updateById = async ({
  id,
  userName,
  email,
  mobile,
  password,
  role,
}) => {
  const user = await (
    await this.getById(id)
  ).updateOne({ userName, email, mobile, password, role }, { new: true });

  return user;
};

exports.getUserByEmailId = async (email) => {
  const user = await UserModel.findOne({ email });

  if (user === null) {
    throw new UserErrors.UserNotFoundError()
  }

  return user;
};

exports.getById = async (id) => {
  const user = await UserModel.findOne({ _id: id });

  return user;
};
