const userControllers = require("./controller");
const { hashingPassword } = require("../../helpers/cryptoHelper");
const userErrors = require("./error/userErrors");
const ValidationSchema = require("../../helpers/validators/validationHelper");

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

    const errorMessage = await validationService(
      params,
      ValidationSchema.registerSchema
    );

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }

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
    console.error(`[${tag}] createUser:`, error);
    userErrors.handleError(error, tag, req, res);
  }
};

exports.validateUser = async (req, res) => {
  try {
    const params = {
      password: req.body.password,
      email: req.body.email,
    };

    const errorMessage = await validationService(
      params,
      ValidationSchema.loginSchema
    );

    if (errorMessage) {
      return res.status(400).json({ status: "error", message: errorMessage });
    }

    const user = await userControllers.validate(params);

    res.status(200).json({ user, message: "successfull", status: "success" });
  } catch (error) {
    console.error(`[${tag}] validateUser:`, error);

    userErrors.handleError(error, tag, req, res);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const params = {
      name: req.query.name,
      email: req.query.email,
      skip: req.query.skip,
      limit: req.query.limit,
      getCount: req.query.getCount,
    };

    const errorMessage = await validationService(
      params,
      ValidationSchema.getAlluserSchema
    );

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }
    let { skip, limit, getCount, name, email } = params;

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
    console.error(`[${tag}] getAllUsers:`, error);

    userErrors.handleError(error, tag, req, res);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };

    const errorMessage = await validationService(
      params,
      ValidationSchema.paramsSchema
    );

    if (errorMessage)
      res.status(400).json({ status: "error", message: errorMessage });

    let user = await userControllers.deleteById(params.id);

    res
      .status(200)
      .json({ user, message: "successfully deleted", status: "success" });
  } catch (error) {
    console.error(`[${tag}] deleteUser:`, error);

    userErrors.handleError(error, tag, req, res);
  }
};

exports.getUser = async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };

    const errorMessage = await validationService(
      params,
      ValidationSchema.paramsSchema
    );

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }

    const id = params.id;

    const user = await userControllers.getById(id);

    res
      .status(200)
      .json({ user, message: "successfully fetched", status: "success" });
  } catch (error) {
    console.error(`[${tag}] getUser:`, error);

    userErrors.handleError(error, tag, req, res);
  }
};

exports.userUpdate = async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      userName: req.body.userName,
      password: req.body.password,
      mobile: req.body.mobile,
      role: req.body.role,
      email: req.body.email,
    };
   console.log(params);
    const errorMessage = await validationService(
      params,
      ValidationSchema.registerSchema
    );

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
    }

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
    console.error(`[${tag}] userUpdate:`, error);

    userErrors.handleError(error, tag, req, res);
  }
};

//!test services

exports.fetchUserId = async (req, res) => {
  try {
    const params = {
      email: req.body.email,
    };

    const errorMessage = await validationService(
      params,
      ValidationSchema.fetchUserId
    );

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
    }

    const { email } =params;
    const user = await userControllers.getUserByEmailId(email);

    res
      .status(200)
      .json({ message: "successfull", status: "success", user: user._id });
  } catch (error) {
    console.error(`[${tag}] fetchUserId:`, error);

    userErrors.handleError(error, tag, req, res);
  }
};

//!service helpers
const validationService = async (params, schema) => {
  //server side validation
  const { error, values } = await schema.validate(params);
  if (error) {
    const firstError = error.details[0];
    return { [firstError.type]: firstError.message };
  }
  return false;
};
