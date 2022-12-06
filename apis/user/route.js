const routes = require("express").Router();
const userRoutes = require("./services");
const {
  registerSchema,
  loginSchema,
} = require("../../helpers/validators/validationHelper");
const baseRoute = "user";
//@access public --method-get
//url=http://localhost:5000/user
routes.get(`/${baseRoute}`, userRoutes.getAllUsers);
//@access public --method-get
//url=http://localhost:5000/user/:id
routes.get(`/${baseRoute}/:id`, userRoutes.getUser);
//@access private --method-POST
//url=http://localhost:5000/user/register
routes.post(`/${baseRoute}`, registerSchema, userRoutes.createUser);
//@access private --method-POST
//url=http://localhost:5000/user/login
routes.post(`/${baseRoute}/login`, loginSchema, userRoutes.validateUser);
//@access private --method-POST
//url=http://localhost:5000/user/setpassword
routes.put(`/${baseRoute}/setpassword`, userRoutes.setPassword);
//@access private --method-put
//url=http://localhost:5000/user/:id
routes.put(`/${baseRoute}/:id`, userRoutes.userUpdate);
//@access privat --method-delete
//url=http://localhost:5000/user/:id
routes.delete(`/${baseRoute}/:id`, userRoutes.deleteUser);

//TODO exporting all routes
module.exports = routes;
