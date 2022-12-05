const routes = require("express").Router();
const {
  adduser,
  validateUser,
  userData,
  deleteUser,
  oneUser,
  oneUserUpdate,
  addUserPassword,
} = require("./services");
const {
  registerSchema,
  loginSchema,
} = require("../../helpers/validators/validationHelper");
const baseRoute = "user";
//@access public --method-get
//url=http://localhost:5000/user
routes.get(`/${baseRoute}`, userData);
//@access public --method-get
//url=http://localhost:5000/user/:id
routes.get(`/${baseRoute}/:id`, oneUser);
//@access private --method-POST
//url=http://localhost:5000/user/register
routes.post(`/${baseRoute}`, registerSchema, adduser);
//@access private --method-POST
//url=http://localhost:5000/user/login
routes.post(`/${baseRoute}/login`, loginSchema, validateUser);
//@access private --method-POST
//url=http://localhost:5000/user/setpassword
routes.put(`/${baseRoute}/setpassword`, addUserPassword);
//@access private --method-put
//url=http://localhost:5000/user/:id
routes.put(`/${baseRoute}/:id`, oneUserUpdate);
//@access privat --method-delete
//url=http://localhost:5000/user/:id
routes.delete(`/${baseRoute}/:id`, deleteUser);

//TODO exporting all routes
module.exports = routes;
