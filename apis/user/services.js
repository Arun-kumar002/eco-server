const { validationResult } = require("express-validator");
const userController = require("./controller");
const tag = "user-service";

let createUser = async (req, res) => {
  try {
    let errorMessage = await validationService(req);

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }

    let { username, password, mobile, role, email } = req.body;
    let user = await userController.createUser({
      username,
      password,
      mobile,
      role,
      email,
      res
    });


  } catch (error) {
    console.log(`[${tag}] createUser:`, error);

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
   await userController.validateUser({ email, password, res });

  } catch (error) {
    console.log(`[${tag}] validateUser:`, error);

    res.status(500).json({ message: "internal server error", status: "error" });
  }
};

let getAllUsers = async (req, res) => {
  try {
    let errorMessage = await validationService(req);

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }
    let { pageno } = req.query;
    let { limit } = req.query;

    await userController.getAllUsers({ pageno, limit, res });

  } catch (error) {
    console.log(`[${tag}] getAllUsers:`, error);

    res.status(500).json({ message: "internal server error", status: "error" });
  }
};

let deleteUser = async (req, res) => {
  try {
    let errorMessage = await validationService(req);

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }
    let id = req.params.id;

    await userController.deleteUser({ id, res });

  } catch (error) {
    console.log(`[${tag}] deleteUser:`, error);

    res.status(500).json({ message: "internal server error", status: "error" });
  }
};

let getUser = async (req, res) => {
  try {
    let errorMessage = await validationService(req);

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }

    let id = req.params.id;
 await userController.getUser({ id, res });

  } catch (error) {
    console.log(`[${tag}] getUser:`, error);

    res.status(500).json({ message: "internal server error", status: "error" });
  }
};

let userUpdate = async (req, res) => {
  try {
    let errorMessage = await validationService(req);

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }

    let id = req.params.id;
    let { username, password, mobile, role, email } = req.body;
    let data = { username, password, mobile, role, email };

    let user = await userController.userUpdate({ id, data, res });
  } catch (error) {
    console.log(`[${tag}] userUpdate:`, error);

    res.status(500).json({ message: "internal server error", status: "error" });
  }
};

let setPassword = async (req, res) => {
  try {
    let errorMessage = await validationService(req);

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }
    let { password, email } = req.body;
    await userController.setPassword({
      email,
      password,
      res,
    });

  } catch (error) {
    console.log(`[${tag}] setPassword:`, error);

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
