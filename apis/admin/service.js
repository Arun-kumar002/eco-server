const { validationResult } = require("express-validator");
const { handleError } = require("../../helpers/handlers/handleerrorHelper");
const { parseError } = require("../../helpers/validators/validationHelper");
const { loginController, adminController } = require("./controller");
const tag = "admin-service";
const validationService = async (req) => {
  //server side validation
  let errors = validationResult(req);

  if (errors.isEmpty()) {
    return false;
  }

  const firstError = errors.errors[0];

  return { [firstError.param]: firstError.msg };
};

const validateAdmin = async (req, res) => {
  let errorMessage = await validationService(req);
  if (errorMessage) {
    return res.status(400).json({ status: "error", message: errorMessage });
  }

  try {
    let { email, password } = req.body;
    let admin = await loginController(email, password);
    
    admin.status =="success"
      ? res.status(200).json(admin)
      : res.status(400).json({ message: "unsuccessfull", status: "error" });

  } catch (error) {
    console.log(`[${tag}] validateAdmin:`, error);
    res.status(500).json({ message: "unknown error", status: "error" });
  }
};

const addAdmin = async (req, res) => {
  try {
    let admin = await adminController(req.body);

    admin.status =="success"
      ? res.status(200).json(admin)
      : res.status(400).json({ message: "unsuccessfull", status: "error" });

  } catch (error) {
    console.log(`[${tag}] addAdmin:`, error);
    res.status(500).json({ message: "unknown error", status: "error" });
  }
};

module.exports = { validateAdmin, addAdmin };
