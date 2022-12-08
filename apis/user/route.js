const routes = require("express").Router();
const userService = require("./services");
const validationSchema= require("../../helpers/validators/validationHelper");
const baseRoute = "user";
//@access public --method-get
//url=http://localhost:5000/user
routes.get(`/${baseRoute}`, validationSchema.getAlluserSchema,userService.getAllUsers);
//@access public --method-get
//url=http://localhost:5000/user/:id
routes.get(`/${baseRoute}/:id`,validationSchema.paramsSchema, userService.getUser);
//@access private --method-POST
//url=http://localhost:5000/user/register
routes.post(`/${baseRoute}`, validationSchema.registerSchema, userService.createUser);
//@access private --method-POST
//url=http://localhost:5000/user/login
routes.post(`/${baseRoute}/login`, validationSchema.loginSchema, userService.validateUser);


//@access private --method-PUT
//url=http://localhost:5000/user/:id
routes.put(`/${baseRoute}/:id`, validationSchema.registerSchema,userService.userUpdate);
//@access privat --method-delete
//url=http://localhost:5000/user/:id
routes.delete(`/${baseRoute}/:id`,validationSchema.paramsSchema, userService.deleteUser);

//? jest testing routes
//@access private --method-POST
//url=http://localhost:5000/user/id
routes.post(`/${baseRoute}/id`,userService.fetchUserId)


//TODO exporting all routes
module.exports = routes;
