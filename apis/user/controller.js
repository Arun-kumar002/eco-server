const { default: mongoose } = require("mongoose");
const { generateToken } = require("../../helpers/generaterandonHelpers");
const UserModel = require("./Models/UserModal");
const UserErrors = require("./error/userErrors");

exports.create = async ({ userName, password, mobile, role, email }) => {
  console.log('im');
  let existsUser = await UserModel.findOne({ email: email });

  if (existsUser) {
    throw new UserErrors.UserExistsError();
  }

  let user=await UserModel.create({
    userName,
    password,
    mobile,
    role,
    email,
  });
  return {user:user}
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

  return {  token:token };
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

  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    throw new UserErrors.UserIdInvalid();
  }

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
    await getById(id)
  ).updateOne({ userName, email, mobile, password, role }, { new: true });

  return user;
};

exports.getUserByEmailId = async (email) => {

  let user = await UserModel.findOne({ email });

  if (user === null) {
    throw new UserErrors(404, "user not found ");
  }

  return user._id;

};

const getById=exports.getById= async (id) => {

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new UserErrors.UserIdInvalid();
  }

  let user = await UserModel.findOne({ _id: id });

  if (user === null) {
    throw new UserErrors.UserExistsError();
  }
 

  return user;
};

