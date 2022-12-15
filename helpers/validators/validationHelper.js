const mongoose = require("mongoose");
const joi = require("joi");
const registerSchema = joi.object({
  userName: joi.string().required("userName is required"),
  password: joi.string().min(5).required("password is required"),
  email: joi.string().email().required("email is required"),
  mobile: joi.allow(),
  role: joi.allow(),
  id:joi.allow()
});

const loginSchema = joi.object({
  email: joi.string().email().required("email is required"),
  password: joi.string().min(5).required("password is required"),
});

const getAlluserSchema = joi.object({
  limit: joi.string().required("limit is required"),
  skip: joi.string().required("skip is required"),
  getCount: joi.string().required("getCount is required"),
  name:joi.allow(),
  email:joi.allow()
});

const paramsSchema =  joi.object({
  id:  joi.string().required("id is required"),
});

const addAdminUserSchema = joi.object({
  email: joi.string().email().required("email is required"),
  password: joi.string().min(5).required("password is required"),
});

const deleteAdminUser = joi.object({
  email: joi.string().email().required("email is required"),
});
const fetchUserId= joi.object({
  email: joi.string().email().required("email is required"),
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
  fetchUserId
};


