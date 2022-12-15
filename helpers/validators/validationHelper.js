const mongoose = require("mongoose");
const joi = require("joi");
const userErrors=require('../../apis/user/error/userErrors')
const registerSchema = joi.object({
  userName: joi.string().required().label('userName').error((error)=> {
    throw new userErrors.ValidationError('userName is Required')
  }),
  password: joi.string().min(5).max(15).required().label('Password').error(()=> {
    throw new userErrors.ValidationError('Password is Required 5 to 15 chr')
  }),
  email: joi.string().email({tlds: { allow: ['com', 'net'] } }).required().label('Email').error(()=> {
    throw new userErrors.ValidationError('please Enter valid email')
  }),
  mobile: joi.number().required().label('Mobile').error(()=> {
    throw new userErrors.ValidationError('mobile no is required')
  }),
  role: joi.string().optional().label('Role').error(()=> {
    throw new userErrors.ValidationError('The role should be a string type')
  }),
  id: joi.string().optional().label('Id').error(()=> {
    throw new userErrors.ValidationError('Id sholud be valid and string type')
  }),
});

const loginSchema = joi.object({
  email: joi.string().email({tlds: { allow: ['com', 'net'] } }).required().label('Email').error(()=> {
    throw new userErrors.ValidationError('please Enter valid email')
  }),
  password: joi.string().min(5).max(15).required().label('Password').error(()=> {
    throw new userErrors.ValidationError('Password is Required 5 to 15 chr')
  }),
});

const getAlluserSchema = joi.object({
  limit: joi.number().integer().required().label('Limit').error(()=> {
    throw new userErrors.ValidationError('limit should be pasitive integer & required')
  }),
  skip: joi.number().integer().required().label('Skip').error(()=> {
    throw new userErrors.ValidationError('skip should be pasitive integer & required')
  }),
  getCount: joi.required().label('getCount').error(()=> {
    throw new userErrors.ValidationError('getCount should be boolean & required')
  }),
  name: joi.string().optional().label('Name').error(()=> {
    throw new userErrors.ValidationError('Name should be string type')
  }),
  email: joi.string().optional().label('Email').error(()=> {
    throw new userErrors.ValidationError('please Enter valid email')
  }),
});

const paramsSchema = joi.object({
  id: joi.string().required().label('Id').error(()=> {
    throw new userErrors.ValidationError('please Enter valid id')
  }),
});
const addAdminUserSchema = joi.object({
  email: joi.string().email({tlds: { allow: ['com', 'net'] } }).required().label('Email').error(()=> {
    throw new userErrors.ValidationError('please Enter valid email')
  }),
  password: joi.string().min(5).max(15).required().label('Password').error(()=> {
    throw new userErrors.ValidationError('Password is Required 5 to 15 chr')
  }),
});

const deleteAdminUser = joi.object({
  email: joi.string().email({tlds: { allow: ['com', 'net'] } }).required().label('Email').error(()=> {
    throw new userErrors.ValidationError('please Enter valid email')
  }),
});
const fetchUserId = joi.object({
  email: joi.string().email({tlds: { allow: ['com', 'net'] } }).required().label('Email').error(()=> {
    throw new userErrors.ValidationError('please Enter valid email')
  }),
});


module.exports = {
  registerSchema,
  loginSchema,
  getAlluserSchema,
  paramsSchema,
  addAdminUserSchema,
  deleteAdminUser,
  fetchUserId,
};
