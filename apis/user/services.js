const { validationResult } = require("express-validator");
const userControllers = require("./controller");
const tag = "user-service";

exports.createUser = async (req, res) => {
  try {
    const errorMessage = await validationService(req);
    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }
    const user = await userControllers.create(req.body);

    res.status(200).json({ user, message: "successfull", status: "success" });
  } catch (error) {
    console.log(`[${tag}] createUser:`, error);

    res
      .status(error.errorCode)
      .json({ message: error.message, status: "error" });
  }
};

exports.validateUser = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage) {
      return res.status(400).json({ status: "error", message: errorMessage });
    }

    const user = await userControllers.validate({ ...req.body });

    res.status(200).json({ user, message: "successfull", status: "success" });
  } catch (error) {
    console.log(`[${tag}] validateUser:`, error);
    res
      .status(error.errorCode)
      .json({ message: error.message, status: "error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }

    let { skip, limit, getCount, name, email } = req.query;

    const users = await userControllers.getAll({ skip, limit, getCount:JSON.parse(getCount), name, email });

    res
      .status(200)
      .json({ users, message: "successfully fetched", status: "success" });

  } catch (error) {
    console.log(`[${tag}] getAllUsers:`, error);
    res
      .status(error.errorCode)
      .json({ message: error.message, status: "error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage)
      res.status(400).json({ status: "error", message: errorMessage });

    const id = req.params.id;
    
    let user = await userControllers.deleteById(id);


    res.status(200).json({user,message:'successfully deleted',status:'success'});

  } catch (error) {
    console.log(`[${tag}] deleteUser:`, error);

    res.status(error.errorCode).json({ message: error.message, status: "error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage) {
      res.status(400).json({ status: "error", message: errorMessage });
      return;
    }

    const id = req.params.id;
    const user = await userControllers.getById( id );

    res.status(200).json({user,message:'successfully fetched',status:'success'});

  } catch (error) {
    console.log(`[${tag}] getUser:`, error);

    res.status(error.errorCode).json({ message: error.message, status: "error" });
  }
};

exports.userUpdate = async (req, res) => {
  try {
    const errorMessage = await validationService(req);

    if (errorMessage) 
      res.status(400).json({ status: "error", message: errorMessage });
    
    const id = req.params.id;
    const {userName,email,mobile,password,role}=req.body
    const user = await userControllers.updateById({ id,userName,email,mobile,password,role});

   res.status(200).json({ message: "updated successfully",user, status: "success" });
  } catch (error) {
    console.log(`[${tag}] userUpdate:`, error);

    res
      .status(error.errorCode)
      .json({ message: error.message, status: "error" });
  }
};

//!test services
exports.fetchUserId = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userControllers.getUserByEmailId( email);

    res.status(200).json({ message: "successfull", status: "success", user });

  } catch (error) {
    console.log(`[${tag}] fetchUserId:`, error);
    res
      .status(error.errorCode)
      .json({ message: error.message, status: "error" });
  }
};
//!service helpers
const validationService = async (request) => {
  //server side validation
  let errors = validationResult(request);

  if (errors.isEmpty()) {
    return false;
  }

  const firstError = errors.errors[0];

  return { [firstError.param]: firstError.msg };
};

