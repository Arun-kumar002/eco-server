const joi = require("joi");
const userErrors=require('../../apis/user/error/userErrors')
const AdminErrors=require('../../apis/admin/error/adminErrors')


exports.registerSchema = joi.object({
  userName: joi.string().required().label('userName').error((error)=> {
    throw new userErrors.ValidationError('userName is Required')
  }),
  password: joi.string().min(5).max(15).optional().label('Password').error(()=> {
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

});

exports.loginSchema = joi.object({
  email: joi.string().email({tlds: { allow: ['com', 'net'] } }).required().label('Email').error(()=> {
    throw new userErrors.ValidationError('please Enter valid email')
  }),
  password: joi.string().min(5).max(15).required().label('Password').error(()=> {
    throw new userErrors.ValidationError('Password is Required 5 to 15 chr')
  }),
});
exports.AdminloginSchema = joi.object({
  email: joi.string().email({tlds: { allow: ['com', 'net'] } }).required().label('Email').error(()=> {
    throw new AdminErrors.ValidationError('please Enter valid email')
  }),
  password: joi.string().min(5).max(15).required().label('Password').error(()=> {
    throw new AdminErrors.ValidationError('Password is Required')
  }),
});
exports.getAlluserSchema = joi.object({
  limit: joi.number().required().label('Limit').error(()=> {
    throw new userErrors.ValidationError('limit should be pasitive integer & required')
  }),
  skip: joi.number().required().label('Skip').error(()=> {
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

exports.paramsSchema = joi.object({
  id: joi.string().required().label('Id').error(()=> {
    throw new userErrors.ValidationError('please Enter valid id')
  }),
});

exports.addAdminUserSchema = joi.object({
  email: joi.string().email({tlds: { allow: ['com', 'net'] } }).required().label('Email').error(()=> {
    throw new AdminErrors.ValidationError('please Enter valid email')
  }),
  password: joi.string().min(5).max(15).required().label('Password').error(()=> {
    throw new AdminErrors.ValidationError('Password is Required 5 to 15 chr')
  }),
});

exports.deleteAdminUser = joi.object({
  email: joi.string().email({tlds: { allow: ['com', 'net'] } }).required().label('Email').error(()=> {
    throw new AdminErrors.ValidationError('please Enter valid email')
  }),
});

exports.fetchUserId = joi.object({
  email: joi.string().email({tlds: { allow: ['com', 'net'] } }).required().label('Email').error(()=> {
    throw new userErrors.ValidationError('please Enter valid email')
  }),
});

exports.updateSchema=joi.object({
  userName: joi.string().required().label('userName').error((error)=> {
    throw new userErrors.ValidationError('userName is Required')
  }),
  password: joi.string().min(5).max(15).required().label('Password').error(()=> {
    throw new userErrors.ValidationError('Password is Required 5 to 15 chr')
  }),
  email: joi.string().email({tlds: { allow: ['com', 'net'] } }).required().label('Email').error(()=> {
    throw new userErrors.ValidationError('please Enter valid email')
  }),
  mobile: joi.number().optional().label('Mobile').error(()=> {
    throw new userErrors.ValidationError('mobile no is required')
  }),
  role: joi.string().optional().label('Role').error(()=> {
    throw new userErrors.ValidationError('The role should be a string type')
  }),
  id: joi.string().required().label('Id').error(()=> {
    throw new userErrors.ValidationError('Id sholud be valid & required')
  }),
});
