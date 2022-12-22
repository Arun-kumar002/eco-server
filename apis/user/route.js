const routes = require("express").Router();
const UserModel = require("./Models/UserModel");
const userService = require("./services");
const baseRoute = "user";

//@access public --method-get
//url=http://localhost:5000/user
routes.get(`/${baseRoute}`, userService.getAllUsers);

//@access public --method-get
//url=http://localhost:5000/user/:id
routes.get(`/${baseRoute}/:id`, userService.getUser);

//@access private --method-POST
//url=http://localhost:5000/user/register
routes.post(`/${baseRoute}`, userService.createUser);

//@access private --method-POST
//url=http://localhost:5000/user/login
routes.post(`/${baseRoute}/login`, userService.validateUser);

//@access private --method-PUT
//url=http://localhost:5000/user/:id
routes.put(`/${baseRoute}/:id`, userService.userUpdate);

//@access privat --method-delete
//url=http://localhost:5000/user/:id
routes.delete(`/${baseRoute}/:id`, userService.deleteUser);

//? jest testing routes
//@access private --method-POST
//url=http://localhost:5000/user/id
routes.post(`/${baseRoute}/id`, userService.fetchUserId);

//TODO exporting all routes
module.exports = routes;
