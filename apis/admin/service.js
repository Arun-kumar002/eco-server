const authControllers = require("./controller");
const { hashingPassword } = require("../../helpers/cryptoHelper");
const ValidationSchema = require("../../helpers/validators/validationHelper");
const userErrors = require("./error/adminErrors");

const tag = "admin-service";

exports.validateAdmin = async (req, res) => {
  const params={
    email:req.body.email,
    password:req.body.password
  }

  const errorMessage = await validationService(params,ValidationSchema.loginSchema);

  if (errorMessage) {
    return res.status(400).json({ status: "error", message: errorMessage });
  }

  try {
    const { email, password } = params;

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
    const params={
      email:req.body.email,
      password:req.body.password
    }
    const errorMessage = await validationService(params,ValidationSchema.addAdminUserSchema);


    if (errorMessage) {
      return res.status(400).json({ status: "error", message: errorMessage });
    }

    const admin = await authControllers.create(params);

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
    const params={
      email:req.body.email,
      password:req.body.password
    }
    const errorMessage = await validationService(params,ValidationSchema.addAdminUserSchema);

    if (errorMessage) {
      return res.status(400).json({ status: "error", message: errorMessage });
    }

    let { email, password } = params;
    password = hashingPassword(password);

    const admin = await authControllers.update({ email, password });
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
    const params={
      email:req.query.email
    }
    const errorMessage = await validationService(params,ValidationSchema.deleteAdminUser);

    if (errorMessage) {
      return res.status(400).json({ status: "error", message: errorMessage });
    }

    const { email } = params;

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
const validationService = async (params, schema) => {
  if (
    !Object.keys(params)[0] === true ||
    Object.values(params).includes(undefined)
  ) {
    throw new userErrors.MandatoryFieldsError();
  }

  //server side validation
  const { error, values } = await schema.validate(params);
  
  if (error) {
    const firstError = error.details[0];
    return { [firstError.type]: firstError.message };
  }
  return false;
};
