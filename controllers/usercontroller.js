const authmodal = require("../Modal/AuthModal");
const { handleError } = require("../helpers/response/handleerrorHelper");
const useralldatacontroller = async (req, res, next) => {
  try {
    console.log("im in");
    let pageno = req.query.pageno;
    let limit = req.query.limit;
    console.log(pageno, limit);
    let alldata = await authmodal
      .find()
      .skip(pageno * limit)
      .limit(limit);
    let total = await authmodal.countDocuments();
    alldata === null
      ? res.json({ message: "no data found" })
      : res.status(200).json({ message: "successfull", user: alldata, total });
  } catch (error) {
    handleError(error, res);
  }
};
let userdeletecontroller = async (req, res, next) => {
  try {
    let id = req.params.id;
    let deleted = await authmodal.findByIdAndDelete(id);
    res.status(200).json({ message: "user deleted", deleted });
  } catch (error) {
    handleError(error, res);
  }
};
let getindividualuser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await authmodal.findById(id);
    user !== null
      ? res.status(200).json({ message: "successfull", user: user })
      : res.json({ message: "something went wrong" });
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
      ? res.json({ message: "something went wrong" })
      : res.status(200).json({ message: "successfull", updated });
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
