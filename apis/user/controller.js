const { generateToken } = require("../../helpers/generaterandonHelpers");
const AuthModal = require("./Models/AuthModal");
const authmodal = require("./Models/AuthModal");
const userSuccess = require("./res/userSuccess");
const tag = "user-Controller";

const createUser = async ({ username, password, mobile, role, email ,res}) => {
  try {
    let checked = await check({ email, modal: AuthModal });
    if (checked) {
      let update= await updated(
        { email },
        { username, password, mobile, role, email },
        { modal: AuthModal }
      );
      res.status(202).json({message:'user updated',status:'success',update})
    }

    let payload = { username, password, mobile, role, email };

    let user=await created({ modal: AuthModal }, { values: payload });
    res.status(200).json({message:'successfull',status:'success',user})


  } catch (error) {
    console.log(`[${tag}]-createUser`, error);
    return { message: "internal server error", status: "error", code: 500 };
  }
};

const validateUser = async ({ email, password, res }) => {
  try {
    let checked = await get(email, AuthModal);

    if (checked && checked.password == password) {
      let token = generateToken(checked._id);
      let payload = { role: checked.role };
      let data = { token, payload };

      res
        .status(200)
        .json({ message: "successfull", data, status: "success", code: 200 });
    }

    res.status(400).json({
      message: "your not a authorized person",
      status: "error",
      code: 400,
    });
  } catch (error) {
    console.log(`[${tag}]-validateUser`, error);
    res
      .status(500)
      .json({ message: "internal server error", status: "error", code: 500 });
  }
};

const getAllUsers = async ({ pageno, limit, res }) => {
  try {
    let alldata = await paginatedata({ modal: AuthModal, limit, pageno });

    let total = await count(AuthModal);

    if (alldata === null)
      res.status(404).json({ status: "error", message: "users not found" });
    let data = { user: alldata, total };
    res
      .status(200)
      .json({ message: "successfull", data, status: "success", code: 200 });
  } catch (error) {
    console.log(`[${tag}]-getAllUsers`, error);
    res
      .status(500)
      .json({ message: "internal server error", status: "error", code: 500 });
  }
};

let deleteUser = async ({ id, res }) => {
  try {
    let deletes = await deleted({ id, modal: AuthModal });

    res
      .status(200)
      .json({ message: "successfull", deletes, status: "success", code: 200 });
  } catch (error) {
    console.log(`[${tag}]-deleteUser`, error);
    res
      .status(500)
      .json({ message: "internal server error", status: "error", code: 500 });
  }
};

let getUser = async ({ id, res }) => {
  try {
    let user = await authmodal.findById(id);

    if (user === null)
      res
        .status(400)
        .json({ message: "unable to update", status: "error", code: 400 });

    res
      .status(200)
      .json({ message: "successfull", user, status: "success", code: 200 });
  } catch (error) {
    console.log(`[${tag}]-getUser`, error);
    res
      .status(500)
      .json({ message: "internal server error", status: "error", code: 500 });
  }
};

let userUpdate = async ({ id, data, res }) => {
  try {
    let updated = await authmodal.findById(id).update(data);
    console.log("im here");

    if (updated === null)
      res
        .status(400)
        .json({ message: "unable to update", status: "error", code: 400 });

    res
      .status(200)
      .json({ message: "successfull", updated, status: "success", code: 200 });
  } catch (error) {
    console.log(`[${tag}]-userUpdate`, error);
    res
      .status(500)
      .json({ message: "internal server error", status: "error", code: 500 });
  }
};

const setPassword = async ({ email, password, res }) => {
  try {
    let checked = await get(email, AuthModal);

    if (checked && checked.useredit !== true) {
      res
        .status(400)
        .json({ message: "unable to update", status: "error", code: 400 });
        return
    } 
      let find = { email };
      let payload = { email, password, useredit: false };

      let user = await updated(
        { find },
        { values: payload },
        { modal: AuthModal }
      );

      res
        .status(202)
        .json({ message: "password updated", status: "success", user });
    
  } catch (error) {
    console.log(`[${tag}]-setPassword`, error);
    res
      .status(500)
      .json({ message: "internal server error", status: "error", code: 500 });
  }
};



//TODO helper functions
const check = async ({ email, modal }) => {
  try {
    let user = await modal.findOne({ email: email });

    if (user === null) return false;
    return true;
  } catch (error) {
    console.log(`[${tag}]-check`, error);
    return false;
  }
};
const get = async (email, modal) => {
  try {
    let user = await modal.findOne({ email: email }).select("+password");

    if (user === null) return false;
    return user;
  } catch (error) {
    console.log(`[${tag}]-check`, error);
    return false;
  }
};

let updated = async ({ find }, { values }, { modal }) => {
  try {
    let update = await modal.findOneAndUpdate(find, values);

    return update;
  } catch (error) {
    console.log(`[${tag}]-updated`, error);
  }
};

let created = async ({ modal }, { values }) => {
  try {
    let user = await modal.create(values);
    
    return user
  } catch (error) {
    console.log(`[${tag}]-created`, error);
  }
};

let count = async (modal) => {
  try {
    let total = await modal.countDocuments();
    return total;
  } catch (error) {
    console.log(`[${tag}]-count`, error);
  }
};
let paginatedata = async ({ modal, limit, pageno }) => {
  try {
    let data = await modal
      .find()
      .skip(pageno * limit)
      .limit(limit);
    return data;
  } catch (error) {
    console.log(`[${tag}]-paginatedata`, error);
  }
};
const deleted = async ({ id, modal }) => {
  try {
    let deleteuser = await modal.findByIdAndDelete(id);
    return deleteuser;
  } catch (error) {
    console.log(`[${tag}]-deleted`, error);
    return;
  }
};

module.exports = {
  createUser,
  validateUser,
  getAllUsers,
  deleteUser,
  getUser,
  userUpdate,
  setPassword,
};
