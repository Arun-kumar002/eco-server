const { generateToken } = require("../../helpers/generaterandonHelpers");
const AuthModal = require("./Models/AuthModal");
const authmodal = require("./Models/AuthModal");
const userSuccess = require("./res/userSuccess");
const userErrors = require("./res/userError");
const tag = "user-Controller";

const registerController = async ({
  username,
  password,
  mobile,
  role,
  email,
}) => {
  try {
    let checked = await check({ email, modal: AuthModal });
    console.log(checked);
    if (checked) {
      return await updated(
        { email },
        { username, password, mobile, role, email },
        { modal: AuthModal }
      );
    }
    let payload = { username, password, mobile, role, email };

    return await created({ modal: AuthModal }, { values: payload });
  } catch (error) {
    console.log(`[${tag}]-registerController`, error);
    return userErrors.internalError();
  }
};

const loginController = async ({ email, password }) => {
  try {
    let checked = await get(email, AuthModal);

    if (checked && checked.password == password) {
      let token = generateToken(checked._id);
      let payload = { role: checked.role };
      let data = { token, payload };

      return user({ data: data });
    }

    return userErrors.unauthorized();
  } catch (error) {
    console.log(`[${tag}]-loginController`, error);
    return userErrors.internalError();
  }
};

const useralldatacontroller = async ({ pageno, limit }) => {
  try {
    let alldata = await paginatedata({ modal: AuthModal, limit, pageno });

    let total = await count(AuthModal);

    if (alldata === null) return userErrors.notFound();
    let data = { user: alldata, total };
    return userSuccess.Success({ data });
  } catch (error) {
    console.log(`[${tag}]-useralldatacontroller`, error);
    return userErrors.internalError();
  }
};

let userdeletecontroller = async (id) => {
  try {
    let deletes = await deleted({ id, modal: AuthModal });

    return userSuccess.Success({ data: deletes });
  } catch (error) {
    console.log(`[${tag}]-userdeletecontroller`, error);
    return userErrors.internalError();
  }
};

let getindividualuser = async ({ id }) => {
  try {
    let user = await authmodal.findById(id);

    if (user === null) return userErrors.notFound();

    return userSuccess.Success({ data: user });
  } catch (error) {
    console.log(`[${tag}]-getindividualuser`, error);
    return userErrors.internalError();
  }
};

let induserupdatecontroller = async ({ id, data }) => {
  try {
    let updatedd = await authmodal.findById(id).update(data);

    if (updated === null) return userErrors.notFound();

    return userSuccess.UpdateSuccess({ data: updatedd });
  } catch (error) {
    console.log(`[${tag}]-induserupdatecontroller`, error);
    return userErrors.internalError();
  }
};

const newUserPasswordController = async ({ email, password }) => {
  try {
    let checked = await get(email, AuthModal);

    if (checked && checked.useredit === true) {
      let find = { email };
      let payload = { email, password, useredit: false };

      let user = await updated(
        { find },
        { values: payload },
        { modal: AuthModal }
      );

      return user
    }
    return userErrors.unable()
  } catch (error) {
    console.log(`[${tag}]-newUserPasswordController`, error);
    return userErrors.internalError();
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
    console.log(find, values);
    let update = await modal.findOneAndUpdate(find, values);

    return userSuccess.UpdateSuccess({ data: update });
  } catch (error) {
    console.log(`[${tag}]-updated`, error);
  }
};

let created = async ({ modal }, { values }) => {
  try {
    console.log(values);
    let user = await modal.create(values);

    return userSuccess.Success({ data: user });
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
  }
};

module.exports = {
  useralldatacontroller,
  userdeletecontroller,
  getindividualuser,
  induserupdatecontroller,
  registerController,
  newUserPasswordController,
  loginController,
};
