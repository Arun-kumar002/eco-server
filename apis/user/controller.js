const authmodal = require("./Models/AuthModal");
const { handleError } = require("../../helpers/handlers/handleerrorHelper");
const { SUCCESSFUL } = require("../../helpers/constants/successmessageHelper");
const {
  NOT_FOUND,
  USER_DELETE,
  SOMETHING,
  FIRST_PASSWORD,
} = require("../../helpers/constants/errormessageHelper");
const registerController = async (req, res, next) => {
  console.log(req.body);
  try {
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
const useralldatacontroller = async (req, res, next) => {
  try {
    let pageno = req.query.pageno;
    let limit = req.query.limit;
    let alldata = await authmodal
      .find()
      .skip(pageno * limit)
      .limit(limit);
    let total = await authmodal.countDocuments();
    alldata === null
      ? res.json({ message: NOT_FOUND })
      : res.status(200).json({ message: SUCCESSFUL, user: alldata, total });
  } catch (error) {
    handleError(error, res);
  }
};
let userdeletecontroller = async (req, res, next) => {
  try {
    let id = req.params.id;
    let deleted = await authmodal.findByIdAndDelete(id);
    res.status(200).json({ message: USER_DELETE, deleted });
  } catch (error) {
    handleError(error, res);
  }
};
let getindividualuser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await authmodal.findById(id);
    user !== null
      ? res.status(200).json({ message: SUCCESSFUL, user: user })
      : res.json({ message: SOMETHING });
  } catch (error) {
    handleError(error, res);
  }
};
let induserupdatecontroller = async (req, res, next) => {
  try {
    console.log(req.body);
    let id = req.params.id;
    let updated = await authmodal.findById(id).update(req.body);
    updated === null
      ? res.json({ message: SOMETHING })
      : res.status(200).json({ message: SUCCESSFUL, updated });
  } catch (error) {
    handleError(error, res);
  }
};
const newUserPasswordController = async (req, res, next) => {
  try {
    let check = await authmodal.findOne({ email: req.body.email });
    if (check === null) {
      res.json({ message: "your not a registered person" });
    }
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
module.exports = {
  useralldatacontroller,
  userdeletecontroller,
  getindividualuser,
  induserupdatecontroller,
  registerController,
  newUserPasswordController,
};
