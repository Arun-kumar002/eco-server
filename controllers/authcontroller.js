const JWT = require("jsonwebtoken");
const { validationResult } = require("express-validator");
//!local module
const authmodal = require("../Modal/AuthModal");
const adminModal = require("../Modal/AdminModel");
const { JWT_SECRET } = require("../config/index");
const {
  parseError,
  registerSchema,
} = require("../helpers/validators/validationHelper");
const { UNPROCESSENTITY } = require("../helpers/response/responseHelper");
const {
  EMAIL_ALREADY,
  NOT_ADMIN,
  UN_AUTHORIZED,
  NEED_REGISTERATION,
  FIRST_PASSWORD,
} = require("../helpers/constants/errormessageHelper");
const { SUCCESSFUL } = require("../helpers/constants/successmessageHelper");
const { handleError } = require("../helpers/handlers/handleerrorHelper");
//!local ends
const registerController = async (req, res, next) => {
  console.log(req.body);
  try {
    //server side validation
    await Promise.all(registerSchema.map((validate) => validate.run(req)));
    let error = validationResult(req);
    if (!error.isEmpty()) {
      const processedErrors = await parseError(
        error.array({
          onlyFirstError: true,
        })
      );
      UNPROCESSENTITY(res, processedErrors[0]);
    }
    //validation ends
    let email = req.body.email;
    // let check = await authmodal.findOne({ email: email });
    if (req.body.accept === true) {
      let update = await authmodal.findOneAndUpdate(
        { email: email },
        { useredit: true }
      );
      res.json({
        message: EMAIL_ALREADY,
        update,
      });
    } else {
      let user = await authmodal.create(req.body);
      let { username, email, mobile } = user;
      let data = { username, email, mobile };
      res.status(200).json({ message: SUCCESSFUL, data });
    }
  } catch (error) {
    handleError(error, res);
  }
};
const loginController = async (req, res, next) => {
  try {
    if (req.body.admin === true) {
      let user = await adminModal.findOne({
        email: req.body.email,
      });
      if (user != null) {
        if (user.password === req.body.password) {
          let token = JWT.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "5d",
          });
          let payload = { role: user.role };
          res.status(200).json({ message: SUCCESSFUL, payload, token });
        }
      } else {
        res.json({ message: NOT_ADMIN });
      }
    } else if (req.body.admin === false) {
      let user = await authmodal.findOne({
        email: req.body.email,
      });

      console.log(user);
      if (user != null) {
        if (user.password === req.body.password) {
          let token = JWT.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "5d",
          });
          let payload = { role: user.role };
          res.status(200).json({ message: SUCCESSFUL, payload, token });
        } else {
          res.json({ message: UN_AUTHORIZED });
        }
      } else {
        res.json({ message: NEED_REGISTERATION });
      }
    } else {
      res.json({ message: NEED_REGISTERATION });
    }
  } catch (error) {
    handleError(error, res);
  }
};
const newUserPasswordController = async (req, res, next) => {
  try {
    let check = await authmodal.findOne({ email: req.body.email });
    if (check.useredit === true) {
      let user = await authmodal.findOneAndUpdate(
        { email: req.body.email },
        { password: req.body.password, useredit: false }
      );
      console.log(user);
      res.status(200).json({ message: SUCCESSFUL, user });
    } else {
      res.json({ message: FIRST_PASSWORD });
    }
  } catch (error) {
    console.log(error);
  }
};
const adminController = async (req, res, next) => {
  try {
    let admin = await adminModal.create(req.body);
    res.status(200).json({ message: SUCCESSFUL, admin });
  } catch (error) {
    handleError(error, res);
  }
};
const deleteController = async (req, res, next) => {
  try {
    let deleted = await authmodal.deleteOne({ email: req.body.email });
    res.status(200).json({ message: SUCCESSFUL, deleted });
  } catch (error) {
    handleError(error, res);
  }
};
module.exports = {
  registerController,
  loginController,
  newUserPasswordController,
  adminController,
  deleteController,
};
