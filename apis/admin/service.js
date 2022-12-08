const { validationResult } = require("express-validator");
const authControllers = require("./controller");
const tag = "admin-service";

exports.validateAdmin = async (req, res) => {
  const errorMessage = await validationService(req);
  if (errorMessage) {
    return res.status(400).json({ status: "error", message: errorMessage });
  }

  try {
    const { email, password } = req.body;

    const admin = await authControllers.validate({ email, password });

    res.status(200).json({ admin, message: "successfull", status: "success" });
  } catch (error) {
    console.log(`[${tag}] validateAdmin:`, error);

    res
      .status(error.errorCode)
      .json({ message: error.message, status: "error" });
  }
};

exports.addAdminUser = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage) {
      return res.status(400).json({ status: "error", message: errorMessage });
    }

    const admin = await authControllers.create(req.body);

    res
      .status(200)
      .json({ admin, message: "successfully added", status: "success" });
  } catch (error) {
    console.log(`[${tag}] addAdminUser:`, error);

    res
      .status(error.errorCode)
      .json({ message: error.message, status: "error" });
  }
};

exports.updateAdminUser = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage) {
      return res.status(400).json({ status: "error", message: errorMessage });
    }

    const admin = await authControllers.update(req.body);
    res
      .status(200)
      .json({ admin, message: "successfully updated", status: "success" });
      
  } catch (error) {
    console.log(`[${tag}] updateAdminUser:`, error);

    res
      .status(error.errorCode)
      .json({ message: error.message, status: "error" });
  }
};

exports.deleteAdminUser = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage) {
      return res.status(400).json({ status: "error", message: errorMessage });
    }

    const { email } = req.query;

    await authControllers.deleteAdminUserByEmail({ email });

    res.status(200).json({ message: "deleted", status: "success" });
  } catch (error) {
    console.log(`[${tag}] deleteAdminUser:`, error);

    res
      .status(error.errorCode)
      .json({ message: error.message, status: "error" });
  }
};

//!service helpers
const validationService = async (req) => {
  //server side validation
  let errors = validationResult(req);

  if (errors.isEmpty()) {
    return false;
  }

  const firstError = errors.errors[0];

  return { [firstError.param]: firstError.msg };
};
