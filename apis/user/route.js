const routes = require("express").Router();
const userService = require("./services");
const {registerSchema,loginSchema} = require("../../helpers/validators/validationHelper");
const baseRoute = "user";
//@access public --method-get
//url=http://localhost:5000/user
routes.get(`/${baseRoute}`, userService.getAllUsers);
//@access public --method-get
//url=http://localhost:5000/user/:id
routes.get(`/${baseRoute}/:id`, userService.getUser);
//@access private --method-POST
//url=http://localhost:5000/user/register
routes.post(`/${baseRoute}`, registerSchema, userService.createUser);
//@access private --method-POST
//url=http://localhost:5000/user/login
routes.post(`/${baseRoute}/login`, loginSchema, userService.validateUser);
//@access private --method-POST
//url=http://localhost:5000/user/setpassword
routes.put(`/${baseRoute}/setpassword`, userService.setPassword);
//@access private --method-put
//url=http://localhost:5000/user/:id
routes.put(`/${baseRoute}/:id`, userService.userUpdate);
//@access privat --method-delete
//url=http://localhost:5000/user/:id
routes.delete(`/${baseRoute}/:id`, userService.deleteUser);

//TODO exporting all routes
module.exports = routes;
