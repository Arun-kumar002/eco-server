const JWT = require("jsonwebtoken");
//!local module
const authmodal = require("../user/Models/AuthModal");
const adminModal = require("../admin/Models/AdminModel");
const { JWT_SECRET } = require("../../config/index");
const {
  NOT_ADMIN,
  UN_AUTHORIZED,
  NEED_REGISTERATION,
} = require("../../helpers/constants/errormessageHelper");
const { SUCCESSFUL } = require("../../helpers/constants/successmessageHelper");
const { handleError } = require("../../helpers/handlers/handleerrorHelper");
//!local ends

const loginController = async (req, res, next) => {
  try {
    if (req.body.admin === true) {
      let user = await adminModal.findOne({
        email: req.body.email,
      });
      if (user!= null) {
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
  loginController,
  adminController,
  deleteController,
};
