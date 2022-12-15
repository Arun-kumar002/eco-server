const { generateToken } = require("../../helpers/generaterandonHelpers");
const UserModel = require("./Models/UserModel");
const UserErrors = require("./error/userErrors");
const { unHashingPassword } = require("../../helpers/cryptoHelper");

exports.create = async ({ userName, password, mobile, role, email }) => {

  if (userName === null || email === null) {
    throw new UserErrors.MandatoryFieldsError();
  }

  let existsUser = await UserModel.findOne({ email: email });

  if (existsUser) {
    throw new UserErrors.EntityExistsError();
  }
  let user = await UserModel.create({
    userName,
    password,
    mobile,
    role,
    email,
  });

  return user;
};

exports.validate = async ({ email, password }) => {
  if (email == null) {
    throw new UserErrors.MandatoryFieldsError();
  }
  const user = await UserModel.findOne({ email }).select("+password");

  if (user === null) {
    throw new UserErrors.UserNotFoundError();
  }
  user.password = unHashingPassword(user.password);

  if (user.password !== password) {
    throw new UserErrors.CredentialsMissmatchError();
  }

  const token = generateToken(user._id);

  return { user, token: token };
};

exports.getAll = async ({ skip, limit, getCount, name, email }) => {
  let query = {};

  if (name && name != "") {
    query.userName = { $regex: name, $options: "g" };
  }

  if (email && email != "") {
    query.email = email;
  }

  let count = undefined;

  if (getCount == true) {
    count = await UserModel.count(query);
  }

  const skipCount = limit == 0 ? skip : skip * limit;

  const users = await UserModel.find(query).skip(skipCount).limit(limit);

  return { users: users || [], count: count };
};

exports.deleteById = async (id) => {
  const deleteuser = await UserModel.findByIdAndDelete(id);

  if (deleteuser === null) {
    throw new UserErrors.EntityNotFoundError();
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
  const user = await await this.getById(id);

  const updated = await UserModel.findOneAndUpdate(
    { email: user.email },
    { userName, email, mobile, password, role },
    { new: true }
  ).select("+password");

  return updated;
};


exports.getUserByEmailId = async (email) => {

  if (email == null) {
    throw new UserErrors.MandatoryFieldsError();
  }

  const user = await UserModel.findOne({ email });

  if (user === null) {
    throw new UserErrors.EntityNotFoundError();
  }

  return user;
};


exports.getById = async (id) => {

  if (id == null) {
    throw new UserErrors.MandatoryFieldsError();
  }

  const user = await UserModel.findOne({ _id: id });

  if (user == null) {
    throw new UserErrors.UserEntityNotFoundError();
  }

  return user;

};

