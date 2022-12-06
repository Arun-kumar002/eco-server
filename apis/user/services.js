const { validationResult } = require("express-validator");
const { parseError } = require("../../helpers/validators/validationHelper");
const userControllers = require("./controller");
const tag = "user-service";

let createUser = async (req, res) => {
  try {
    let validate = await validationService(req);
    if (validate) {
      res.status(400).json(validate);
      return;
    }

    let { username, password, mobile, role, email } = req.body;
    let user = await userControllers.registerController({
      username,
      password,
      mobile,
      role,
      email,
    });

    res.status(user.code).json(user);
  } catch (error) {
    console.log(`[${tag}] adduser:`, error);
    res.status(500).json({ message: "internal server error", status: "error" });
  }
};

let validateUser = async (req, res) => {
  try {
    let errorMessage = await validationService(req);

    if (errorMessage) {
      return res.status(400).json({ status: "error", message: errorMessage });
    }

    let { email, password } = req.body;
    let user = await userControllers.loginController({ email, password });
    res.status(user.code).json(user);
  } catch (error) {
    console.log(`[${tag}] validateUser:`, error);
    res.status(500).json({ message: "internal server error", status: "error" });
  }
};

let getAllUsers = async (req, res) => {
  try {
    let { pageno } = req.query || 0;
    let { limit } = req.query || 5;

    let user = await userControllers.useralldatacontroller({ pageno, limit });
    res.status(user.code).json(user);
  } catch (error) {
    console.log(`[${tag}] userData:`, error);
    res.status(500).json({ message: "internal server error", status: "error" });
  }
};

let deleteUser = async (req, res) => {
  try {
    let id = req.params.id;

    let user = await userControllers.userdeletecontroller(id);
    res.status(user.code).json(user);
  } catch (error) {
    console.log(`[${tag}] deleteUser:`, error);
    res.status(500).json({ message: "internal server error", status: "error" });
  }
};

let getUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await userControllers.getindividualuser({ id });

    res.status(user.code).json(user);
  } catch (error) {
    console.log(`[${tag}] oneUser:`, error);
    res.status(500).json({ message: "internal server error", status: "error" });
  }
};

let userUpdate = async (req, res) => {
  try {
    let id = req.params.id;
    let { username, password, mobile, role, email } = req.body;
    let data = { username, password, mobile, role, email };

    let user = await userControllers.induserupdatecontroller({ id, data });

    res.status(user.code).json(user);
  } catch (error) {
    console.log(`[${tag}] oneUser:`, error);
    res.status(500).json({ message: "internal server error", status: "error" });
  }
};

let setPassword = async (req, res) => {
  try {
    let { password, email } = req.body;
    let user = await userControllers.newUserPasswordController({
      email,
      password,
    });

    res.status(user.code).json(user);
  } catch (error) {
    console.log(`[${tag}] oneUser:`, error);
    res.status(500).json({ message: "internal server error", status: "error" });
  }
};

//!service helpers
const validationService = async (request) => {
  //server side validation
  let errors = validationResult(request);

  if (errors.isEmpty()) {
    return false;
  }

  const firstError = errors.errors[0];

  return { [firstError.param]: firstError.msg };
};

module.exports = {
  validateUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  setPassword,
  userUpdate,
};
