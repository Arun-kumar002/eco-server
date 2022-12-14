const { validationResult } = require("express-validator");
const userControllers = require("./controller");
const tag = "user-service";
const { hashingPassword } = require("../../helpers/cryptoHelper");
const userErrors = require("./error/userErrors");

exports.createUser = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }

    let { userName, password, mobile, role, email } = req.body;

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
    console.log(`[${tag}] createUser:`, error);
    userErrors.handleError(error, res);
  }
};

exports.validateUser = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage) {
      return res.status(400).json({ status: "error", message: errorMessage });
    }

    const user = await userControllers.validate({ ...req.body });

    res.status(200).json({ user, message: "successfull", status: "success" });
  } catch (error) {
    console.log(`[${tag}] validateUser:`, error);

    userErrors.handleError(error, res);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }
    let { skip, limit, getCount, name, email } = req.query;

    const users = await userControllers.getAll({
      skip,
      limit,
      getCount: JSON.parse(getCount),
      name,
      email,
    });

    res
      .status(200)
      .json({ users, message: "successfully fetched", status: "success" });
  } catch (error) {
    console.log(`[${tag}] getAllUsers:`, error);

    userErrors.handleError(error, res);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage)
      res.status(400).json({ status: "error", message: errorMessage });

    const id = req.params.id;

    let user = await userControllers.deleteById(id);

    res
      .status(200)
      .json({ user, message: "successfully deleted", status: "success" });
  } catch (error) {
    console.log(`[${tag}] deleteUser:`, error);

    userErrors.handleError(error, res);
  }
};

exports.getUser = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }

    const id = req.params.id;

    const user = await userControllers.getById(id);

    res
      .status(200)
      .json({ user, message: "successfully fetched", status: "success" });
  } catch (error) {
    console.log(`[${tag}] getUser:`, error);

    userErrors.handleError(error, res);
  }
};

exports.userUpdate = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage)
      res.status(400).json({ status: "error", message: errorMessage });

    const id = req.params.id;
    let { userName, email, mobile, password, role } = req.body;
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
    console.log(`[${tag}] userUpdate:`, error);

    userErrors.handleError(error, res);
  }
};

//!test services
exports.fetchUserId = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userControllers.getUserByEmailId(email);

    res
      .status(200)
      .json({ message: "successfull", status: "success", user: user._id });
  } catch (error) {
    console.log(`[${tag}] fetchUserId:`, error);
    
    userErrors.handleError(error, res);
  }
};


//!service helpers
const validationService = async (req) => {

  let { ...data } = { ...req.body, ...req.query, ...req.params };
  if (
    !Object.keys(data)[0] === true ||
    Object.values(data).includes(undefined)
  ) {
    throw new userErrors.MandatoryFieldsError();
  }

  //server side validation
  let errors = validationResult(req);

  if (errors.isEmpty()) {
    return false;
  }

  const firstError = errors.errors[0];

  return { [firstError.param]: firstError.msg };
};
