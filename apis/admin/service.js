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

    let admin = await authControllers.validateAdmin({ email, password });

    res.status(200).json(admin);
  } catch (error) {
    console.log(`[${tag}] validateAdmin:`, error);

    res.status(500).json({ message: "internal error", status: "error" });
  }
};

const addAdminUser = async (req, res) => {
  try {
    let admin = await authControllers.addAdminUser(req.body);

    res.status(200).json(admin);
  } catch (error) {
    console.log(`[${tag}] addAdminUser:`, error);

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

module.exports = { validateAdmin, addAdminUser };
