const queryString = require("node:querystring");
const userControllers = require("./controller");
const { hashingPassword } = require("../../helpers/cryptoHelper");
const userErrors = require("./error/userErrors");
const ValidationSchema = require("../../helpers/validators/validationHelper");
const { default: mongoose } = require("mongoose");

const tag = "user-service";

exports.createUser = async (req, res) => {
  try {
    const params = {
      userName: req.body.userName,
      password: req.body.password,
      mobile: req.body.mobile,
      role: req.body.role,
      email: req.body.email,
    };

    await ValidationSchema.registerSchema.validateAsync(params);

    let { userName, password, mobile, role, email } = params;
    password = hashingPassword(password);

    const user = await userControllers.create({
      userName,
      password,
      mobile,
      role,
      email,
    });

    res
      .status(200)
      .json({ user: user, message: "successfull", status: "success" });
  } catch (error) {
    userErrors.handleError(error, tag, req, res);
  }
};

exports.validateUser = async (req, res) => {
  try {
    const params = {
      password: req.body.password,
      email: req.body.email,
    };

    await ValidationSchema.loginSchema.validateAsync(params);

    const user = await userControllers.validate(params);

    res.status(200).json({ user, message: "successfull", status: "success" });
  } catch (error) {
    userErrors.handleError(error, tag, req, res);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const params = {
      skip: parseInt(req.query.skip),
      limit: parseInt(req.query.limit),
      getCount:
        req.query.getCount === undefined
          ? undefined
          : !parseInt(req.query.getCount),
      name: req.query.name,
      email: req.query.email,
    };

    await ValidationSchema.getAlluserSchema.validateAsync(params);

    let { skip, limit, getCount, name, email } = params;

    const users = await userControllers.getAll({
      skip,
      limit,
      getCount,
      name,
      email,
    });

    res
      .status(200)
      .json({ users, message: "successfully fetched", status: "success" });
  } catch (error) {
    userErrors.handleError(error, tag, req, res);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const params = {
      id: req.params.id == "undefined" ? undefined : req.params.id,
    };
    
    await ValidationSchema.paramsSchema.validateAsync(params);
    await isMongoIdValid(params.id)
    let user = await userControllers.deleteById(params.id);

    res
      .status(200)
      .json({ user, message: "successfully deleted", status: "success" });
  } catch (error) {

    userErrors.handleError(error, tag, req, res);
  }
};

exports.getUser = async (req, res) => {
  try {
    const params = {
      id: req.params.id == "undefined" ? undefined : req.params.id,
    };

    await ValidationSchema.paramsSchema.validateAsync(params);
    await isMongoIdValid(params.id)
    const user = await userControllers.getById(params.id);

    res
      .status(200)
      .json({ user, message: "successfully fetched", status: "success" });
  } catch (error) {

    userErrors.handleError(error, tag, req, res);
  }
};

exports.userUpdate = async (req, res) => {
  try {
    const params = {
      id: req.params.id == "undefined" ? undefined : req.params.id,
      userName: req.body.userName,
      password: req.body.password,
      mobile: req.body.mobile,
      role: req.body.role,
      email: req.body.email,
    };
    await ValidationSchema.updateSchema.validateAsync(params);
    await isMongoIdValid(params.id)
    let { id, userName, email, mobile, password, role } = params;
    password = hashingPassword(password);

    const user = await userControllers.updateById({
      id,
      userName,
      email,
      mobile,
      password,
      role,
    });

    res
      .status(200)
      .json({ message: "updated successfully", user, status: "success" });
  } catch (error) {
    userErrors.handleError(error, tag, req, res);
  }
};

//!test services

exports.fetchUserId = async (req, res) => {
  try {
    const params = {
      email: req.body.email,
    };

    await ValidationSchema.fetchUserId.validateAsync(params);

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
    }

    const { email } = params;
    const user = await userControllers.getUserByEmailId(email);

    res
      .status(200)
      .json({ message: "successfull", status: "success", user: user._id });
  } catch (error) {

    userErrors.handleError(error, tag, req, res);
  }
};

//!service helpers

const isMongoIdValid = (id) => {
  let isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new userErrors.MongoIdInvalidError();
  }
  return;
};
