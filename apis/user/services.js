const { validationResult } = require("express-validator");
const { parseError } = require("../../helpers/validators/validationHelper");
const {
  useralldatacontroller,
  userdeletecontroller,
  getindividualuser,
  induserupdatecontroller,
  registerController,
  newUserPasswordController,
  loginController,
} = require("./controller");
const tag = "user-service";

const validationService = async (request) => {
  //server side validation
  let errors = validationResult(request);

  if (errors.isEmpty()) {
    return false;
  }

  const firstError = errors.errors[0];

  return { [firstError.param]: firstError.msg };
};

let adduser = async (req, res) => {
  try {
    let validate = await validationService(req); //validtion
    if (validate === false) {
      let { username, password, mobile, role, email } = req.body;
      let user = await registerController({
        username,
        password,
        mobile,
        role,
        email,
      });

      res.status(200).json(user);
    } else res.status(400).json(validate);
  } catch (error) {
    console.log(`[${tag}] adduser:`, error);
    res.status(500).json({ message: "unknown error", status: "error" });
  }
};

let validateUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await loginController({ email, password });

    user.status == "success"
      ? res.status(200).json(user)
      : res.status(400).json(user);
  } catch (error) {
    console.log(`[${tag}] validateUser:`, error);
    res.status(500).json({ message: "unknown error", status: "error" });
  }
};

let userData = async (req, res) => {
  try {
    let { pageno, limit } = req.query;
    let user = await useralldatacontroller({ pageno, limit });
    user.status == "success"
      ? res.status(200).json(user)
      : res.status(400).json(user);
  } catch (error) {
    console.log(`[${tag}] userData:`, error);
    res.status(500).json({ message: "unknown error", status: "error" });
  }
};

let deleteUser = async (req, res) => {
  try {

    let id = req.params.id;
    let user = await userdeletecontroller(id);

    user.status == "success"
      ? res.status(200).json(user)
      : res.status(400).json(user);

  } catch (error) {
    console.log(`[${tag}] deleteUser:`, error);
    res.status(500).json({ message: "unknown error", status: "error" });
  }
};


let oneUser=async(req,res)=>{
  try {
    let id = req.params.id;
    let user = await getindividualuser({id});

    user.status == "success"
      ? res.status(200).json(user)
      : res.status(400).json(user);

  } catch (error) {
    console.log(`[${tag}] oneUser:`, error);
    res.status(500).json({ message: "unknown error", status: "error" });
  }
}

let oneUserUpdate=async(req,res)=>{
  try {

    let id = req.params.id;
    let { username, password, mobile, role, email } = req.body;
    let data={ username, password, mobile, role, email }

    let user = await newUserPasswordController({id,data});

    user.status == "success"
      ? res.status(200).json(user)
      : res.status(400).json(user);

  } catch (error) {
    console.log(`[${tag}] oneUser:`, error);
    res.status(500).json({ message: "unknown error", status: "error" });
  }
}


let addUserPassword=async(req,res)=>{
  try {

    let { password,email } = req.body;
    let user = await newUserPasswordController({email,password});

    user.status == "success"
      ? res.status(200).json(user)
      : res.status(400).json(user);

  } catch (error) {
    console.log(`[${tag}] oneUser:`, error);
    res.status(500).json({ message: "unknown error", status: "error" });
  }
}

module.exports = { adduser, validateUser, userData,deleteUser ,oneUser,oneUserUpdate,addUserPassword};
