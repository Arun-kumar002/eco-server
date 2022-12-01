const JWT = require("jsonwebtoken");
const authmodal = require("../Modal/AuthModal");
const adminModal = require("../Modal/AdminModel");
const { JWT_SECRET } = require("../config/index");
const registerController = async (req, res, next) => {
  console.log(req.body);
  try {
    let email = req.body.email;
    // let check = await authmodal.findOne({ email: email });
    if (req.body.accept === true) {
      let update = await authmodal.findOneAndUpdate(
        { email: email },
        { useredit: true }
      );
      res.json({
        message: "The email already present in database, the value is updated",
        update,
      });
    } else {
      let user = await authmodal.create(req.body);
      let { username, email, mobile } = user;
      let data = { username, email, mobile };
      res.status(200).json({ message: "successfull", data });
    }
  } catch (error) {
    console.log(error);
  }
};
const loginController = async (req, res, next) => {
  try {
    if (req.body.admin === true) {
      let user = await adminModal.findOne({
        email: req.body.email,
      });
      if (user.password === req.body.password) {
        let token = JWT.sign({ id: user._id }, JWT_SECRET, { expiresIn: "5d" });
        let payload = { role: user.role };
        res.status(200).json({ message: "successfull", payload, token });
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
          res.status(200).json({ message: "successfull", payload, token });
        } else {
          res.json({ message: "unauthorized" });
        }
      } else {
        res.json({ message: "contact admin for registration" });
      }
    } else {
      res.json({ message: "contact admin for registration" });
    }
  } catch (error) {
    console.log(error);
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
      res.status(200).json({ message: "successfull", user });
    } else {
      res.json({ message: "your not the first time user" });
    }
  } catch (error) {
    console.log(error);
  }
};
const adminController = async (req, res, next) => {
  try {
    let admin = await adminModal.create(req.body);
    res.status(200).json({ message: "admin registered", admin });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registerController,
  loginController,
  newUserPasswordController,
  adminController,
};
