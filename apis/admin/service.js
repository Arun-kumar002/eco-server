const authControllers = require("./controller");
const { hashingPassword } = require("../../helpers/cryptoHelper");
const ValidationSchema = require("../../helpers/validators/validationHelper");
const adminError = require("./error/adminErrors");

const tag = "admin-service";

exports.validateAdmin = async (req, res) => {
  const params = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    
    await ValidationSchema.AdminloginSchema.validateAsync(params);
    const { email, password } = params;

    const admin = await authControllers.validate({ email, password });

    res.status(200).json({ admin, message: "successfull", status: "success" });
  } catch (error) {
    adminError.handleError(error, tag, req, res);
  }
};

exports.addAdminUser = async (req, res) => {
  try {
    const params = {
      email: req.body.email,
      password: req.body.password,
    };
    await ValidationSchema.addAdminUserSchema.validateAsync(params);

    const admin = await authControllers.create(params);

    res
      .status(200)
      .json({ admin, message: "successfully added", status: "success" });
  } catch (error) {
    adminError.handleError(error, tag, req, res);
  }
};

exports.updateAdminUser = async (req, res) => {
  try {
    const params = {
      email: req.body.email,
      password: req.body.password,
    };
    await ValidationSchema.addAdminUserSchema.validateAsync(params);

    let { email, password } = params;
    password = hashingPassword(password);

    const admin = await authControllers.update({ email, password });
    res
      .status(200)
      .json({ admin, message: "successfully updated", status: "success" });
  } catch (error) {
    adminError.handleError(error, tag, req, res);
  }
};

exports.deleteAdminUser = async (req, res) => {
  try {
    const params = {
      email: req.query.email,
    };

    await ValidationSchema.deleteAdminUser.validateAsync(params);


    const { email } = params;

    await authControllers.deleteAdminUserByEmail({ email });

    res.status(200).json({ message: "deleted", status: "success" });
  } catch (error) {
    adminError.handleError(error, tag, req, res);
  }
};

//!private
exports.getAdmin=async(req,res)=>{
  try {
   let users=await authControllers.getAdmin();
    res.status(200).json({users,message: "successfull", status: "success" });
  } catch (error) {
    adminError.handleError(error, tag, req, res);
  }
}

