const { validationResult } = require("express-validator");
const { handleError } = require("../../helpers/handlers/handleerrorHelper");
const { parseError } = require("../../helpers/validators/validationHelper");
const authControllers = require("./controller");
const tag = "admin-service";
const validateAdmin = async (req, res, next) => {
  let errorMessage = await validationService(req);
  if (errorMessage) {
    return res.status(400).json({ status: "error", message: errorMessage });
  }

  try {
    let { email, password } = req.body;
    let admin = await authControllers.loginController(email, password);
    res.status(admin.code).json(admin);
  } catch (error) {
    console.log(`[${tag}] validateAdmin:`, error);
    res.status(500).json({ message: "internal error", status: "error" });
  }
};

const addAdmin = async (req, res) => {
  try {
    let admin = await authControllers.adminController(req.body);
    res.status(admin.code).json(admin);
  } catch (error) {
    console.log(`[${tag}] addAdmin:`, error);
    res.status(500).json({ message: "internal error", status: "error" });
  }
};

const validationService = async (req) => {
  //server side validation
  let errors = validationResult(req);

  if (errors.isEmpty()) {
    return false;
  }

  const firstError = errors.errors[0];

  return { [firstError.param]: firstError.msg };
};


module.exports = { validateAdmin, addAdmin };
