const { checkSchema } = require("express-validator");
const mongoose = require("mongoose");

const registerSchema = checkSchema({
  userName: {
    isLength: {
      options: { min: 6, max: 30 },
      errorMessage: "username should be minimum 6 and maximum 30 characters",
    },
    exists: {
      errorMessage: "username is required",
    },
    isEmpty: {
      negated: true,
      errorMessage: "username cannot be empty",
    },
  },
  password: {
    isLength: {
      errorMessage: "password should be greater than 4",
      options: { min: 5 },
    },
    exists: {
      errorMessage: "password is required",
    },
    isEmpty: {
      negated: true,
      errorMessage: "password cannot be empty",
    },
  },
  email: {
    isEmail: {
      errorMessage: "enter a valid email id",
    },
  },
});

const loginSchema = checkSchema({
  email: {
    isEmail: {
      errorMessage: "enter a valid email id",
    },
  },
  password: {
    isLength: {
      errorMessage: "password should be greater than 4",
      options: { min: 5 },
    },
    exists: {
      errorMessage: "password is required",
    },
    isEmpty: {
      negated: true,
      errorMessage: "password cannot be empty",
    },
  },
});

const getAlluserSchema = checkSchema({
  limit: {
    exists: {
      errorMessage: "limit is required",
    },
  },
  skip: {
    exists: {
      errorMessage: "pageno is required",
    },
  },
  getCount: {
    exists: {
      errorMessage: "getCount is required",
    },
  },
});

const paramsSchema = checkSchema({
  id: {
    exists: {
      errorMessage: "params id  is required",
    },
    custom: {
      options: (value, { req }) => {
        let isValid = mongoose.Types.ObjectId.isValid(value);
        if (!isValid) {
          throw new Error("user id invalid");
        }
        return true;
      },
    },
  },
});

const addAdminUserSchema = checkSchema({
  email: {
    isEmail: {
      errorMessage: "enter a valid email id",
    },
  },
  password: {
    isLength: {
      errorMessage: "password should be greater than 4",
      options: { min: 5 },
    },
    exists: {
      errorMessage: "password is required",
    },
    isEmpty: {
      negated: true,
      errorMessage: "password cannot be empty",
    },
  },
});

const deleteAdminUser = checkSchema({
  email: {
    isEmail: {
      errorMessage: "enter a valid email id",
    },
  },
});
//! parse the validation requsets
const parseError = (error) => {
  const query = error.map((err) => {
    let params = err.param;
    let msg = err.msg;
    return { [params]: msg };
  });
  return query;
};
module.exports = {
  registerSchema,
  parseError,
  loginSchema,
  getAlluserSchema,
  paramsSchema,
  addAdminUserSchema,
  deleteAdminUser,
};
