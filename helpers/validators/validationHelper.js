const { checkSchema } = require("express-validator");
const registerSchema = checkSchema({
  username: {
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
    // custom: {
    //   options: (value, { req }) => {
    //     let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    //     if (!re.test(value)) {
    //       throw new Error(
    //         "your password should have 5 char 1 up , 1 lower,1 numeric"
    //       );
    //     }
    //     return true;
    //   },
    // },
  // },
  email: {
    isEmail: {
      errorMessage: "enter a valid email id",
    },
  },
});
const loginSchema=checkSchema({
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
})
//! parse the validation requsets
const parseError = (error) => {
  const query = error.map((err) => {
    let params = err.param;
    let msg = err.msg;
    return { [params]: msg };
  });
  return query;
};
module.exports = { registerSchema, parseError ,loginSchema};
