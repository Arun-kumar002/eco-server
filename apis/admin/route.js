const routes = require("express").Router();
const {
  loginController,
  adminController,
  deleteController,
} = require("./controller");
//@access private --method-POST
//url=http://localhost:5000/auth/login
routes.post(`/login`, loginController);
// //@access private --method-POST
// //url=http://localhost:5000/auth/user/delete
//// routes.post(`/${baseRoute}/delete`, deleteController);
//!admin
//@access private --method-POST
//url=http://localhost:5000/auth/admin/register
routes.post("/admin/addadmin", adminController);

//TODO exporting all routes
module.exports = routes;
