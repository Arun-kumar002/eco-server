const authmodal = require("../Modal/AuthModal");
const { handleError } = require("../helpers/handlers/handleerrorHelper");
const { SUCCESSFUL } = require("../helpers/constants/successmessageHelper");
const {
  NOT_FOUND,
  USER_DELETE,
  SOMETHING,
} = require("../helpers/constants/errormessageHelper");
const useralldatacontroller = async (req, res, next) => {
  try {
    let pageno = req.query.pageno;
    let limit = req.query.limit;
    console.log(pageno, limit);
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
module.exports = {
  useralldatacontroller,
  userdeletecontroller,
  getindividualuser,
  induserupdatecontroller,
};
